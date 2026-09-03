'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/screens/Home";
import About from "../components/screens/About";
import Experience from "../components/screens/Experience";
import Projects from "../components/screens/Projects";
import Skills from "../components/screens/Skills";
import Contact from "../components/screens/Contact";

export default function page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#031d38]">
      
      {/* Layer 1: Base Gradient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_#085195_10%,_#03386a_35%,_#020b14_100%)] z-0 pointer-events-none" />

      {/* Layer 2: Floating CSS Shapes (Between gradient and main content) */}
      <div className="bg-shapes-container">
        <div className="bg-shape square shape-1" />
        <div className="bg-shape circle shape-2" />
        <div className="bg-shape triangle shape-3" />
        <div className="bg-shape square shape-4" />
        <div className="bg-shape circle shape-5" />
        <div className="bg-shape triangle shape-6" />
        <div className="bg-shape circle shape-7" />
        <div className="bg-shape square shape-8" />
        <div className="bg-shape circle shape-9" />
      </div>

      {/* Layer 3: Glassmorphic Main Page Content */}
      <main 
        id="bodyMain" 
        className="relative z-10 min-h-screen w-full bg-transparent text-white flex flex-col justify-between"
      >
        <Navbar />
        <Home />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>

    </div>
  );
}