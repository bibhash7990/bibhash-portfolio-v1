import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Achievements from "./components/homepage/achievements";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Languages from "./components/homepage/languages";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Stats from "./components/homepage/stats";

async function getData() {
  if (!personalData.devUsername) {
    return [];
  }

  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <Stats />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Achievements />
      <Languages />
      {blogs.length > 0 && <Blog blogs={blogs} />}
      <ContactSection />
    </div>
  )
};