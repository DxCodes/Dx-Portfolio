import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <main>
      <Hero />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
