import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site/SiteNav";
import { Preloader } from "@/components/site/Preloader";
import { IntroReel } from "@/components/site/IntroReel";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Roadmap } from "@/components/site/Roadmap";
import { Skills } from "@/components/site/Skills";
import { Certifications } from "@/components/site/Certifications";
import { CiscoWork } from "@/components/site/CiscoWork";
import { Projects } from "@/components/site/Projects";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";

function App() {
  return (
    <div className="min-h-screen">
      <Preloader />
      <SiteNav />
      <main>
        <IntroReel />
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <CiscoWork />
        <Projects />
        <Roadmap />
        <Contact />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
