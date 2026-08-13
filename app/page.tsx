import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import EducationLanguages from "@/components/EducationLanguages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

// Always read the latest content.json — lets admin-panel edits show up
// without a full rebuild when self-hosted.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <main className="relative">
      <Nav />
      <Hero hero={content.hero} contact={content.contact} />
      <TechMarquee />
      <Experience experience={content.experience} />
      <Projects projects={content.projects} />
      <Skills skills={content.skills} />
      <EducationLanguages education={content.education} languages={content.languages} />
      <Contact contact={content.contact} />
      <Footer />
    </main>
  );
}
