'use client';

import React from 'react';
import Image from 'next/image';
import { FaTerminal, FaCode, FaPaintBrush, FaTerminal as FaPrompt } from 'react-icons/fa';

export default function About() {
  return (
    <section
      id="about"
      className="w-full min-h-screen text-white flex flex-col justify-center items-center relative overflow-hidden"
      style={{ padding: '48px 24px' }}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center my-auto gap-8 lg:gap-10">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-['Montserrat_Alternates'] tracking-wide">
            About Me
          </h2>
          <p className="text-xs sm:text-sm text-teal-300/80 mt-1.5 font-medium">
            System tinkerer, tool builder, and full stack craftsman.
          </p>
        </div>

        {/* Main Section Grid */}
        <div className="flex flex-col-reverse lg:flex-row w-full items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Side: Glassmorphic Terminal Card */}
          <div className="flex flex-col justify-between gap-4 w-full lg:w-1/2">
            
            <div className="bg-slate-900/40 border border-teal-500/25 rounded-2xl backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden flex flex-col transition-all duration-300 hover:border-teal-400/50 hover:shadow-[0_0_25px_rgba(45,212,191,0.15)]">
              
              {/* Authentic Terminal Header */}
              <div 
                className="bg-slate-950/60 border-b border-white/10 flex items-center justify-between backdrop-blur-md"
                style={{ padding: '10px 18px' }}
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-[10px] font-mono text-teal-300/80 tracking-wider truncate ml-2">
                  akshat@dev ~ % cat philosophy.txt
                </span>
              </div>

              {/* Terminal Content Body */}
              <div 
                className="flex flex-col gap-3"
                style={{ padding: '22px 26px' }}
              >
                
                {/* Core Principle Title (Bumped to Medium Size) */}
                <div className="flex items-center gap-2 text-teal-400">
                  <FaPrompt className="text-sm shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold text-teal-300 font-mono tracking-wide">
                    Build with intent. Automate the repetitive.
                  </h3>
                </div>

                {/* Body Paragraphs */}
                <p className="text-[11px] sm:text-xs text-slate-200 leading-normal font-normal">
                  I am a <span className="text-teal-300 font-semibold">Software Engineer</span> driven by an urge to understand how complex systems work end-to-end from UI pixels and smooth animations down to APIs, databases, OS internals, and deployment pipelines.
                </p>

                <p className="text-[11px] sm:text-xs text-slate-200 leading-normal font-normal">
                  Rather than tolerating bad tooling, I prefer building missing tools myself—whether that means scripting a <span className="text-white font-medium underline decoration-teal-400/50 underline-offset-4">custom editor extension</span>, engineering an <span className="text-white font-medium underline decoration-teal-400/50 underline-offset-4">interactive web app</span>, or designing a <span className="text-white font-medium underline decoration-teal-400/50 underline-offset-4">resilient test automation suite</span>.
                </p>

                <p 
                  className="text-[11px] sm:text-xs text-slate-300/90 leading-normal italic font-light border-t border-white/10"
                  style={{ paddingTop: '12px', marginTop: '2px' }}
                >
                  My process is hands-on and experimental: interact with the system, learn through failure modes, and refine until the code is rock-solid and intuitive to use.
                </p>

              </div>
            </div>

            {/* Core Pillars (Matching Glassmorphic Look) */}
            <div className="grid grid-cols-3 gap-2.5">
              <div 
                className="bg-slate-900/40 border border-teal-500/20 rounded-xl flex flex-col items-center text-center gap-1 backdrop-blur-xl hover:border-teal-400/40 transition-all hover:bg-slate-900/60"
                style={{ padding: '12px 8px' }}
              >
                <FaTerminal className="text-teal-400 text-sm sm:text-base" />
                <span className="text-[10px] font-bold text-white tracking-wide">Full Stack Control</span>
              </div>
              <div 
                className="bg-slate-900/40 border border-teal-500/20 rounded-xl flex flex-col items-center text-center gap-1 backdrop-blur-xl hover:border-teal-400/40 transition-all hover:bg-slate-900/60"
                style={{ padding: '12px 8px' }}
              >
                <FaCode className="text-teal-400 text-sm sm:text-base" />
                <span className="text-[10px] font-bold text-white tracking-wide">Tooling & Automation</span>
              </div>
              <div 
                className="bg-slate-900/40 border border-teal-500/20 rounded-xl flex flex-col items-center text-center gap-1 backdrop-blur-xl hover:border-teal-400/40 transition-all hover:bg-slate-900/60"
                style={{ padding: '12px 8px' }}
              >
                <FaPaintBrush className="text-teal-400 text-sm sm:text-base" />
                <span className="text-[10px] font-bold text-white tracking-wide">UX & Aesthetics</span>
              </div>
            </div>

          </div>

          {/* Right Side: Scaled-Up Animated Blob Frame */}
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-[26rem] lg:h-[26rem] flex items-center justify-center">
              
              {/* Ambient Glow behind the Blob */}
              <div className="absolute inset-0 z-0 bg-teal-400/20 blur-3xl rounded-full animate-pulse" />

              {/* Morphing Blob Frame */}
              <div 
                className="relative z-10 w-full h-full overflow-hidden bg-slate-900 animate-blob transition-all duration-500 rounded-[30%_70%_53%_47%/_26%_46%_54%_74%] shadow-[0_-2vmin_4vmin_#ADD8E6_inset,_0_1vmin_4vmin_#7B68EE_inset,_0_-2vmin_7vmin_#4169E1_inset] filter drop-shadow-[0_0_3vmin_#1E90FF]"
              >
                {/* Image Masked Inside */}
                <Image
                  src="/assets/img/portfolio.jpg"
                  alt="Akshat Kumar Sinha"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top scale-105"
                  priority
                />

                {/* Glass Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}