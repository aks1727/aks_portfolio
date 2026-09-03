'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/screens/Home";
import About from "../components/screens/About";
import Experience from "../components/screens/Experience";
import Projects from "../components/screens/Projects";
import Skills from "../components/screens/Skills";
import Contact from "../components/screens/Contact";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full">
      
      {/* Layer 1: Base Gradient Background */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 w-full h-full bg-[radial-gradient(circle_at_top,_#085195_10%,_#03386a_35%,_#020b14_100%)] z-0 pointer-events-none" 
      />

      {/* Layer 2: Floating CSS Shapes */}
      <div className="bg-shapes-container">
        <span className="bg-shape text-teal-400 shape-1">{'<code />'}</span>
        <span className="bg-shape text-cyan-300 shape-2">{'{ ...state }'}</span>
        <span className="bg-shape text-blue-400 shape-3">{'git::commit'}</span>
        <span className="bg-shape text-emerald-400 shape-4">{'async / await'}</span>
        <span className="bg-shape text-teal-300 shape-5">{'=>'}</span>
        <span className="bg-shape text-cyan-400 shape-6">{'0x7FFD'}</span>
        <span className="bg-shape text-blue-300 shape-7">{'test.expect()'}</span>
        <span className="bg-shape text-indigo-400 shape-8">{'npm run build'}</span>
        <span className="bg-shape text-teal-200 shape-9">{'Docker::container'}</span>
        <span className="bg-shape text-sky-400 shape-10">{'try { resolve() }'}</span>
        <span className="bg-shape text-emerald-300 shape-11">{'const [data, set]'}</span>
        <span className="bg-shape text-cyan-200 shape-12">{'API.endpoint'}</span>
      </div>

      {/* Persistent Sticky Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main 
        id="bodyMain" 
        className="relative z-10 w-full bg-transparent text-white flex flex-col justify-between"
      >
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