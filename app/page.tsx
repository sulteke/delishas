import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CollectionsPreview } from "@/components/home/CollectionsPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AboutStory } from "@/components/home/AboutStory";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { Contact } from "@/components/home/Contact";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <CollectionsPreview />
      <WhyUs />
      <HowItWorks />
      <AboutStory />
      <Gallery />
      <Testimonials />
      <Contact />
      <CtaBanner />
    </>
  );
}
