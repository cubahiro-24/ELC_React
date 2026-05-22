import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "src");
const screensDir = path.join(src, "screens");

function read(rel) {
  return fs.readFileSync(path.join(src, rel), "utf8");
}

function stripModule(content) {
  return content
    .replace(/^import[\s\S]*?from\s+["'][^"']+["'];\n/gm, "")
    .replace(/^export function /gm, "function ")
    .replace(/^export const /gm, "const ")
    .trim();
}

function writeScreen(filename, content) {
  fs.mkdirSync(screensDir, { recursive: true });
  fs.writeFileSync(path.join(screensDir, filename), content);
}

// --- Accueil ---
writeScreen("HomeScreen.jsx", `import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronRight, Pause, Play, Quote,
} from "lucide-react";
import { useRouter } from "../context/RouterContext.jsx";
import { SERVICES } from "../data/services.js";
import { MagneticButton } from "../components/ui/MagneticButton.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { useReveal } from "../hooks/useReveal.js";

${stripModule(read("components/ui/CountUp.jsx"))}

${stripModule(read("components/home/CinematicHero.jsx"))}

${stripModule(read("components/home/MarqueeBand.jsx"))}

${stripModule(read("components/home/ManifestoSection.jsx"))}

${stripModule(read("components/home/ServicesPreview.jsx"))}

${stripModule(read("components/home/NumbersThatMatter.jsx"))}

${stripModule(read("components/home/TestimonialReel.jsx"))}

${stripModule(read("components/home/FaqAccordion.jsx"))}

${stripModule(read("components/home/FinalCTA.jsx"))}

export function HomeScreen() {
  return (
    <>
      <CinematicHero />
      <MarqueeBand />
      <ManifestoSection />
      <ServicesPreview />
      <NumbersThatMatter />
      <TestimonialReel />
      <FaqAccordion />
      <FinalCTA />
    </>
  );
}
`);

// --- À propos ---
writeScreen(
  "AboutScreen.jsx",
  read("pages/AboutPage.jsx").replace("export function AboutPage", "export function AboutScreen")
);

// --- Services ---
writeScreen(
  "ServicesScreen.jsx",
  read("pages/ServicesPage.jsx").replace("export function ServicesPage", "export function ServicesScreen")
);

// --- Actualités ---
const newsPage = stripModule(read("pages/NewsPage.jsx")).replace("function NewsPage", "export function NewsScreen");
writeScreen("NewsScreen.jsx", `import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { NEWS } from "../data/news.js";

${stripModule(read("components/news/FeaturedArtwork.jsx"))}

${stripModule(read("components/news/ArticleArtwork.jsx"))}

${newsPage}
`);

// --- Contact ---
const contactPage = stripModule(read("pages/ContactPage.jsx")).replace("function ContactPage", "export function ContactScreen");
writeScreen("ContactScreen.jsx", `import { useState } from "react";
import {
  Award, CheckCircle2, Clock, Compass, Mail, MapPin, Phone, Send, Users,
} from "lucide-react";
import { PageHero } from "../components/layout/PageHero.jsx";
import { Reveal } from "../components/ui/Reveal.jsx";
import { MagneticButton } from "../components/ui/MagneticButton.jsx";
import { SERVICES } from "../data/services.js";

const fieldStyle = {
  background: "transparent", border: "none", borderBottom: "1px solid rgba(26,22,18,0.3)",
  padding: "10px 0", fontFamily: "'Newsreader', serif", fontSize: 16, color: "#1a1612",
  outline: "none", transition: "border-color .3s", width: "100%",
};

${stripModule(read("components/contact/Field.jsx"))}

${stripModule(read("components/contact/InfoBlock.jsx"))}

${stripModule(read("components/contact/StylizedMap.jsx"))}

${contactPage}
`);

// --- Barrel export ---
writeScreen("index.js", `export { HomeScreen } from "./HomeScreen.jsx";
export { AboutScreen } from "./AboutScreen.jsx";
export { ServicesScreen } from "./ServicesScreen.jsx";
export { NewsScreen } from "./NewsScreen.jsx";
export { ContactScreen } from "./ContactScreen.jsx";
`);

console.log("Screens consolidated into src/screens/");
