import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourcePath = path.join(root, "AplaElc (2).jsx");
const srcDir = path.join(root, "src");

const source = fs.readFileSync(sourcePath, "utf8");
const lines = source.split("\n");

function extract(start, end) {
  return lines.slice(start - 1, end).join("\n");
}

function extractBlock(name) {
  const fnRegex = new RegExp(`^function ${name}\\(`);
  const constRegex = new RegExp(`^const ${name} =`);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (fnRegex.test(lines[i]) || constRegex.test(lines[i])) {
      start = i;
      break;
    }
  }
  if (start === -1) throw new Error(`Block not found: ${name}`);

  let depth = 0;
  let started = false;
  let end = start;

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    for (const ch of line) {
      if (ch === "{") {
        depth++;
        started = true;
      } else if (ch === "}") {
        depth--;
      }
    }
    if (started && depth === 0) {
      end = i;
      break;
    }
  }

  return lines.slice(start, end + 1).join("\n");
}

function writeFile(relPath, header, body, footer = "") {
  const fullPath = path.join(srcDir, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${header}\n\n${body}\n${footer}`);
}

// --- Context ---
writeFile(
  "context/RouterContext.jsx",
  `import { createContext, useContext } from "react";

export const RouterContext = createContext({ path: "/", navigate: () => {} });
export const useRouter = () => useContext(RouterContext);`,
  ""
);

// --- Hooks ---
writeFile(
  "hooks/useReveal.js",
  `import { useState, useEffect, useRef } from "react";

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}`,
  ""
);

// --- Data ---
const servicesData = extract(1966, 2009);
writeFile(
  "data/services.js",
  `import {
  BookOpen, Languages, Mic, GraduationCap, Building2, Monitor,
} from "lucide-react";

export const SERVICES = ${servicesData.replace(/^const SERVICES = /, "")}`,
  ""
);

writeFile(
  "data/timeline.js",
  `export const TIMELINE = ${extract(2011, 2018).replace(/^const TIMELINE = /, "")}`,
  ""
);

writeFile(
  "data/news.js",
  `export const NEWS = ${extract(2020, 2027).replace(/^const NEWS = /, "")}`,
  ""
);

writeFile(
  "data/navigation.js",
  `export const NAV_ITEMS = [
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Actualités", to: "/news" },
  { label: "Contact", to: "/contact" },
];`,
  ""
);

// --- Styles ---
const globalStylesBody = extractBlock("GlobalStyles")
  .replace(/^function GlobalStyles\(\)/, "export function GlobalStyles()");

writeFile(
  "styles/GlobalStyles.jsx",
  `import React from "react";`,
  globalStylesBody
);

// --- Atmosphere ---
const atmosphereComponents = [
  "LoadingScreen",
  "CustomCursor",
  "ScrollProgress",
  "AmbientShapes",
  "GrainOverlay",
];

for (const name of atmosphereComponents) {
  const body = extractBlock(name).replace(
    new RegExp(`^function ${name}`),
    `export function ${name}`
  );
  const imports =
    name === "LoadingScreen" || name === "CustomCursor" || name === "ScrollProgress" || name === "AmbientShapes"
      ? `import { useState, useEffect } from "react";`
      : `import React from "react";`;
  writeFile(`components/atmosphere/${name}.jsx`, imports, body);
}

// --- UI ---
const revealBody = extractBlock("Reveal")
  .replace(/^function Reveal/, "export function Reveal");
writeFile(
  "components/ui/Reveal.jsx",
  `import { useReveal } from "../../hooks/useReveal.js";`,
  revealBody
);

const magneticBody = extractBlock("MagneticButton")
  .replace(/^function MagneticButton/, "export function MagneticButton");
writeFile(
  "components/ui/MagneticButton.jsx",
  `import { useRef } from "react";`,
  magneticBody
);

const countUpBody = extractBlock("CountUp")
  .replace(/^function CountUp/, "export function CountUp");
writeFile(
  "components/ui/CountUp.jsx",
  `import { useState, useEffect } from "react";
import { useReveal } from "../../hooks/useReveal.js";`,
  countUpBody
);

// --- Layout ---
const monogramBody = extractBlock("Monogram")
  .replace(/^function Monogram/, "export function Monogram");
writeFile("components/layout/Monogram.jsx", `import React from "react";`, monogramBody);

const pageHeroBody = extractBlock("PageHero")
  .replace(/^function PageHero/, "export function PageHero");
writeFile("components/layout/PageHero.jsx", `import React from "react";`, pageHeroBody);

const navBody = extractBlock("Nav")
  .replace(/^function Nav/, "export function Nav")
  .replace(
    `  const items = [
    { label: "Accueil", to: "/" },
    { label: "À propos", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Actualités", to: "/news" },
    { label: "Contact", to: "/contact" },
  ];`,
    `  const items = NAV_ITEMS;`
  );
writeFile(
  "components/layout/Nav.jsx",
  `import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { NAV_ITEMS } from "../../data/navigation.js";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Monogram } from "./Monogram.jsx";`,
  navBody
);

const footerBody = extractBlock("Footer")
  .replace(/^function Footer/, "export function Footer");
writeFile(
  "components/layout/Footer.jsx",
  `import { ArrowRight, Mail, Phone } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";`,
  footerBody
);

// --- Contact form helpers ---
writeFile(
  "components/contact/fieldStyle.js",
  `export const fieldStyle = {
  background: "transparent", border: "none", borderBottom: "1px solid rgba(26,22,18,0.3)",
  padding: "10px 0", fontFamily: "'Newsreader', serif", fontSize: 16, color: "#1a1612",
  outline: "none", transition: "border-color .3s", width: "100%",
};`,
  ""
);

const fieldBody = extractBlock("Field")
  .replace(/^function Field/, "export function Field");
writeFile("components/contact/Field.jsx", `import React from "react";`, fieldBody);

const infoBlockBody = extractBlock("InfoBlock")
  .replace(/^function InfoBlock/, "export function InfoBlock");
writeFile("components/contact/InfoBlock.jsx", `import React from "react";`, infoBlockBody);

const stylizedMapBody = extractBlock("StylizedMap")
  .replace(/^function StylizedMap/, "export function StylizedMap");
writeFile("components/contact/StylizedMap.jsx", `import React from "react";`, stylizedMapBody);

// --- Home sections ---
const homeSections = {
  CinematicHero: `import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { MagneticButton } from "../ui/MagneticButton.jsx";`,
  MarqueeBand: `import React from "react";`,
  ManifestoSection: `import { ArrowRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Reveal } from "../ui/Reveal.jsx";`,
  ServicesPreview: `import { ArrowUpRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { SERVICES } from "../../data/services.js";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Reveal } from "../ui/Reveal.jsx";`,
  NumbersThatMatter: `import { Reveal } from "../ui/Reveal.jsx";
import { CountUp } from "../ui/CountUp.jsx";`,
  TestimonialReel: `import { useState, useEffect } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { Reveal } from "../ui/Reveal.jsx";`,
  FaqAccordion: `import { useState } from "react";
import { Reveal } from "../ui/Reveal.jsx";`,
  FinalCTA: `import { ChevronRight } from "lucide-react";
import { useRouter } from "../../context/RouterContext.jsx";
import { MagneticButton } from "../ui/MagneticButton.jsx";
import { Reveal } from "../ui/Reveal.jsx";`,
};

for (const [name, header] of Object.entries(homeSections)) {
  const body = extractBlock(name).replace(
    new RegExp(`^function ${name}`),
    `export function ${name}`
  );
  writeFile(`components/home/${name}.jsx`, header, body);
}

// --- News artwork ---
const featuredBody = extractBlock("FeaturedArtwork")
  .replace(/^function FeaturedArtwork/, "export function FeaturedArtwork");
writeFile("components/news/FeaturedArtwork.jsx", `import React from "react";`, featuredBody);

const articleBody = extractBlock("ArticleArtwork")
  .replace(/^function ArticleArtwork/, "export function ArticleArtwork");
writeFile("components/news/ArticleArtwork.jsx", `import React from "react";`, articleBody);

// --- Pages ---
const homePageBody = extractBlock("HomePage")
  .replace(/^function HomePage/, "export function HomePage")
  .replace(/const \{ navigate \} = useRouter\(\);\n  /, "");
writeFile(
  "pages/HomePage.jsx",
  `import { CinematicHero } from "../components/home/CinematicHero.jsx";
import { MarqueeBand } from "../components/home/MarqueeBand.jsx";
import { ManifestoSection } from "../components/home/ManifestoSection.jsx";
import { ServicesPreview } from "../components/home/ServicesPreview.jsx";
import { NumbersThatMatter } from "../components/home/NumbersThatMatter.jsx";
import { TestimonialReel } from "../components/home/TestimonialReel.jsx";
import { FaqAccordion } from "../components/home/FaqAccordion.jsx";
import { FinalCTA } from "../components/home/FinalCTA.jsx";`,
  homePageBody
);

const aboutBody = extractBlock("AboutPage")
  .replace(/^function AboutPage/, "export function AboutPage");
writeFile(
  "pages/AboutPage.jsx",
  `import { Award } from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { TIMELINE } from "../data/timeline.js";`,
  aboutBody
);

const servicesPageBody = extractBlock("ServicesPage")
  .replace(/^function ServicesPage/, "export function ServicesPage");
writeFile(
  "pages/ServicesPage.jsx",
  `import { useState } from "react";
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Headphones, PenTool, Target, TrendingUp,
} from "lucide-react";
import { useRouter } from "../context/RouterContext.jsx";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { SERVICES } from "../data/services.js";`,
  servicesPageBody
);

const newsPageBody = extractBlock("NewsPage")
  .replace(/^function NewsPage/, "export function NewsPage");
writeFile(
  "pages/NewsPage.jsx",
  `import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { FeaturedArtwork } from "../components/news/FeaturedArtwork.jsx";
import { ArticleArtwork } from "../components/news/ArticleArtwork.jsx";
import { NEWS } from "../data/news.js";`,
  newsPageBody
);

let contactBody = extractBlock("ContactPage")
  .replace(/^function ContactPage/, "export function ContactPage")
  .replace(/style={fieldStyle}/g, "style={fieldStyle}")
  .replace(/const fieldStyle = \{[\s\S]*?\};\n\n/g, "");

writeFile(
  "pages/ContactPage.jsx",
  `import { useState } from "react";
import {
  Award, CheckCircle2, Clock, Compass, Mail, MapPin, Phone, Send, Users,
} from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { MagneticButton } from "../components/ui/MagneticButton.jsx";
import { Field } from "../components/contact/Field.jsx";
import { fieldStyle } from "../components/contact/fieldStyle.js";
import { InfoBlock } from "../components/contact/InfoBlock.jsx";
import { StylizedMap } from "../components/contact/StylizedMap.jsx";
import { SERVICES } from "../data/services.js";`,
  contactBody
);

// --- App ---
const appBody = extract(20, 88)
  .replace(/^export default function App/, "export default function App")
  .replace(
    `{path === "/" && <HomePage />}`,
    `{path === "/" && <HomePage />}`
  );

writeFile(
  "App.jsx",
  `import { useState, useEffect } from "react";
import { RouterContext } from "./context/RouterContext.jsx";
import { LoadingScreen } from "./components/atmosphere/LoadingScreen.jsx";
import { CustomCursor } from "./components/atmosphere/CustomCursor.jsx";
import { ScrollProgress } from "./components/atmosphere/ScrollProgress.jsx";
import { GrainOverlay } from "./components/atmosphere/GrainOverlay.jsx";
import { AmbientShapes } from "./components/atmosphere/AmbientShapes.jsx";
import { Nav } from "./components/layout/Nav.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { GlobalStyles } from "./styles/GlobalStyles.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { NewsPage } from "./pages/NewsPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";`,
  appBody.replace(
    `<RouterContext.Provider`,
    `<RouterContext.Provider`
  )
);

writeFile(
  "main.jsx",
  `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  ""
);

writeFile(
  "index.css",
  `*, *::before, *::after {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,
  ""
);

console.log("Project split complete.");
