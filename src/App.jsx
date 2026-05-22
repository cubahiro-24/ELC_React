import { useState, useEffect } from "react";
import { RouterContext } from "./context/RouterContext.jsx";
import { LoadingScreen } from "./components/atmosphere/LoadingScreen.jsx";
import { CustomCursor } from "./components/atmosphere/CustomCursor.jsx";
import { ScrollProgress } from "./components/atmosphere/ScrollProgress.jsx";
import { GrainOverlay } from "./components/atmosphere/GrainOverlay.jsx";
import { AmbientShapes } from "./components/atmosphere/AmbientShapes.jsx";
import { Nav } from "./components/layout/Nav.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { GlobalStyles } from "./styles/GlobalStyles.jsx";
import {
  HomeScreen,
  AboutScreen,
  ServicesScreen,
  NewsScreen,
  ContactScreen,
} from "./screens/index.js";

export default function App() {
  const [path, setPath] = useState("/");
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const navigate = (to) => {
    if (to === path) return;
    setTransitioning(true);
    setTimeout(() => {
      setPath(to);
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => setTransitioning(false), 80);
    }, 450);
  };

  useEffect(() => {
    const id = "apla-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..900,0..100,0..1&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=JetBrains+Mono:wght@300;400;500&display=swap";
      document.head.appendChild(link);
    }
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      <div
        style={{
          background: "#f4ede0",
          color: "#1a1612",
          fontFamily: "'Newsreader', Georgia, serif",
          minHeight: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {!loaded && <LoadingScreen />}
        <CustomCursor />
        <ScrollProgress />
        <GrainOverlay />
        <AmbientShapes />
        <Nav />

        <main
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(20px)" : "translateY(0)",
            transition: "opacity .45s cubic-bezier(.4,0,.2,1), transform .45s cubic-bezier(.4,0,.2,1)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {path === "/" && <HomeScreen />}
          {path === "/about" && <AboutScreen />}
          {path === "/services" && <ServicesScreen />}
          {path === "/news" && <NewsScreen />}
          {path === "/contact" && <ContactScreen />}
        </main>

        <Footer />
        <GlobalStyles />
      </div>
    </RouterContext.Provider>
  );
}
