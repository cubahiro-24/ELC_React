import { CinematicHero } from "../components/home/CinematicHero.jsx";
import { MarqueeBand } from "../components/home/MarqueeBand.jsx";
import { ManifestoSection } from "../components/home/ManifestoSection.jsx";
import { ServicesPreview } from "../components/home/ServicesPreview.jsx";
import { NumbersThatMatter } from "../components/home/NumbersThatMatter.jsx";
import { TestimonialReel } from "../components/home/TestimonialReel.jsx";
import { FaqAccordion } from "../components/home/FaqAccordion.jsx";
import { FinalCTA } from "../components/home/FinalCTA.jsx";

export function HomePage() {
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
