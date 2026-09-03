'use client';

import React from 'react';
import Image from 'next/image';
import { FaTerminal, FaCode, FaPaintBrush, FaTerminal as FaPrompt } from 'react-icons/fa';

export default function About() {
  return (
    <section
      id="about"
      className="bg-transparent w-full min-h-screen text-white flex flex-col justify-center items-center relative overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center my-auto gap-10 sm:gap-12 lg:gap-14">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Montserrat_Alternates'] tracking-wide">
            About Me
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-teal-300/80 mt-2 font-medium">
            System tinkerer, tool builder, and full stack craftsman.
          </p>
        </div>

        {/* Main Section Grid */}
        <div className="flex flex-col-reverse lg:flex-row w-full items-center justify-between gap-10 lg:gap-14 xl:gap-16">
          
          {/* Left Side: Glassmorphic Terminal Card */}
          <div className="flex flex-col justify-between gap-5 w-full lg:w-1/2">
            
            <div className="bg-slate-900/40 border border-teal-500/25 rounded-3xl backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden flex flex-col transition-all duration-300 hover:border-teal-400/50 hover:shadow-[0_0_25px_rgba(45,212,191,0.15)]">
              
              {/* Terminal Header */}
              <div className="bg-slate-950/60 border-b border-white/10 flex items-center justify-between backdrop-blur-md px-5 py-3.5 sm:px-6 sm:py-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-teal-300/80 tracking-wider truncate ml-2">
                  akshat@dev ~ % cat philosophy.txt
                </span>
              </div>

              {/* Terminal Content Body */}
              <div className="flex flex-col gap-4 p-5 sm:p-7 lg:p-8">
                
                {/* Core Principle Title: Locked to single line on sm+ and wraps on small mobile */}
                <div className="flex items-center gap-2 text-teal-400 min-w-0">
                  <FaPrompt className="text-xs sm:text-sm shrink-0" />
                  <h3 className="text-xs sm:text-[13px] md:text-sm lg:text-[15px] xl:text-base font-bold text-teal-300 font-mono tracking-tight whitespace-normal sm:whitespace-nowrap">
                    Build with intent. Automate the repetitive.
                  </h3>
                </div>

                {/* Body Paragraphs */}
                <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                  I am a <span className="text-teal-300 font-semibold">Software Engineer</span> driven by an urge to understand how complex systems work end-to-end—from UI pixels and smooth animations down to APIs, databases, OS internals, and deployment pipelines.
                </p>

                <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal">
                  Rather than tolerating bad tooling, I prefer building missing tools myself—whether that means scripting a <span className="text-white font-medium underline decoration-teal-400/50 underline-offset-4">custom editor extension</span>, engineering an <span className="text-white font-medium underline decoration-teal-400/50 underline-offset-4">interactive web app</span>, or designing a <span className="text-white font-medium underline decoration-teal-400/50 underline-offset-4">resilient test automation suite</span>.
                </p>

                <p className="text-xs sm:text-sm lg:text-base text-slate-300/90 leading-relaxed italic font-light border-t border-white/10 pt-4 mt-1">
                  My process is hands-on and experimental: interact with the system, learn through failure modes, and refine until the code is rock-solid and intuitive to use.
                </p>

              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
              <div className="bg-slate-900/40 border border-teal-500/20 rounded-2xl flex flex-col items-center text-center gap-2 backdrop-blur-xl hover:border-teal-400/40 transition-all hover:bg-slate-900/60 py-3.5 px-2 sm:py-4 sm:px-3">
                <FaTerminal className="text-teal-400 text-base sm:text-lg" />
                <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">Full Stack Control</span>
              </div>
              <div className="bg-slate-900/40 border border-teal-500/20 rounded-2xl flex flex-col items-center text-center gap-2 backdrop-blur-xl hover:border-teal-400/40 transition-all hover:bg-slate-900/60 py-3.5 px-2 sm:py-4 sm:px-3">
                <FaCode className="text-teal-400 text-base sm:text-lg" />
                <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">Tooling & Automation</span>
              </div>
              <div className="bg-slate-900/40 border border-teal-500/20 rounded-2xl flex flex-col items-center text-center gap-2 backdrop-blur-xl hover:border-teal-400/40 transition-all hover:bg-slate-900/60 py-3.5 px-2 sm:py-4 sm:px-3">
                <FaPaintBrush className="text-teal-400 text-base sm:text-lg" />
                <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">UX & Aesthetics</span>
              </div>
            </div>

          </div>

          {/* Right Side: Scaled Animated Blob Frame */}
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] flex items-center justify-center">
              
              {/* Ambient Glow */}
              <div className="absolute inset-0 z-0 bg-teal-400/20 blur-3xl rounded-full animate-pulse" />

              {/* Morphing Blob Frame */}
              <div className="relative z-10 w-full h-full overflow-hidden bg-slate-900 animate-blob transition-all duration-500 rounded-[30%_70%_53%_47%/_26%_46%_54%_74%] shadow-[0_-2vmin_4vmin_#ADD8E6_inset,_0_1vmin_4vmin_#7B68EE_inset,_0_-2vmin_7vmin_#4169E1_inset] drop-shadow-[0_0_3vmin_#1E90FF]">
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