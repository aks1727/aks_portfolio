'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TypingEffect from "../TypingAnimation";
import { FaFileAlt, FaFilePdf, FaChevronUp, FaPlay, FaPause } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { IoCubeOutline, IoSparklesOutline, IoFilmOutline } from "react-icons/io5";

// Declare custom web component for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'power-preference'?: string;
          'render-scale'?: string;
          'shadow-intensity'?: string;
          'shadow-softness'?: string;
          exposure?: string;
          'interaction-prompt'?: string;
          loading?: string;
          autoplay?: boolean;
          'animation-name'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function Home() {
    const [isSticky, setIsSticky] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Animation Controls State
    const [animations, setAnimations] = useState<string[]>([]);
    const [selectedAnimation, setSelectedAnimation] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState<boolean>(true);

    const heroRef = useRef<HTMLDivElement>(null);
    const modelViewerRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 1. Inject Meshopt Decoder to prevent GLTFLoader Meshopt crash
            if (!document.getElementById('meshopt-decoder-script')) {
                const script = document.createElement('script');
                script.id = 'meshopt-decoder-script';
                script.src = 'https://unpkg.com/meshoptimizer@0.18.1/meshopt_decoder.js';
                script.async = true;
                document.head.appendChild(script);
            }

            // 2. Dynamically load model-viewer Web Component
            import("@google/model-viewer").catch((err) =>
                console.error("Failed to load model-viewer", err)
            );
        }

        // Track scroll position for sticky action button
        const handleScroll = () => {
            setIsSticky(window.scrollY >= window.innerHeight * 0.3);
        };

        // Pause WebGL rendering when scrolled out of view
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    // Extract available animation names once model finishes loading
    const handleModelLoad = () => {
        if (modelViewerRef.current) {
            const availableAnimations = modelViewerRef.current.availableAnimations || [];
            setAnimations(availableAnimations);
            if (availableAnimations.length > 0) {
                setSelectedAnimation(availableAnimations[0]);
            }
        }
    };

    // Toggle Play/Pause state
    const togglePlayback = () => {
        if (modelViewerRef.current) {
            if (isPlaying) {
                modelViewerRef.current.pause();
            } else {
                modelViewerRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <section
                ref={heroRef}
                id="home"
                className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center relative overflow-hidden"
                style={{ padding: '64px 24px' }}
            >
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-6xl mx-auto w-full flex flex-col items-center my-auto gap-8 lg:gap-12 z-10">

                    {/* Badge Title Header */}
                    <div 
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 border border-teal-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(45,212,191,0.15)]"
                        style={{ padding: '8px 20px' }}
                    >
                        <IoSparklesOutline className="text-teal-400 text-sm animate-pulse" />
                        <span className="text-xs font-mono font-semibold text-teal-300 tracking-wider uppercase">
                            Interactive Developer Environment
                        </span>
                    </div>

                    {/* Main Content Layout */}
                    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14">

                        {/* Terminal Window housing 3D Model with Animation Controls */}
                        <div 
                            className="w-full lg:w-1/2 h-[320px] sm:h-[380px] lg:h-[420px] rounded-3xl border border-teal-500/20 bg-slate-900/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center justify-between relative overflow-hidden group hover:border-teal-400/40 transition-all duration-500"
                            style={{ padding: '20px 24px' }}
                        >
                            
                            {/* Terminal Top Bar */}
                            <div 
                                className="w-full flex items-center justify-between border-b border-white/10 z-10"
                                style={{ paddingBottom: '12px' }}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                                </div>
                                <span className="text-[11px] font-mono text-teal-300/80 flex items-center gap-1.5">
                                    <IoCubeOutline className="text-teal-400" /> portfolio.glb
                                </span>
                            </div>

                            {/* 3D GLB Model Viewer Canvas (Plays GLTF Animations) */}
                            <div className="relative w-full h-full flex items-center justify-center my-auto pointer-events-none">
                                <div className="absolute inset-0 bg-teal-400/10 blur-2xl rounded-full animate-pulse pointer-events-none" />
                                
                                {isVisible && (
                                    <model-viewer
                                        ref={modelViewerRef}
                                        src="/assets/model/portfolio-draco.glb"
                                        alt="3D Portfolio Workspace Model"
                                        power-preference="high-performance"
                                        render-scale="0.8"
                                        shadow-intensity="0.3"
                                        shadow-softness="0.5"
                                        exposure="0.9"
                                        interaction-prompt="none"
                                        loading="eager"
                                        autoplay
                                        animation-name={selectedAnimation}
                                        onLoad={handleModelLoad}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'transparent',
                                        }}
                                    />
                                )}
                            </div>

                            {/* Terminal Bottom Controls Bar: Dropdown + Play/Pause Button */}
                            <div 
                                className="w-full flex items-center justify-between border-t border-white/10 text-[10px] font-mono text-slate-400 z-10"
                                style={{ paddingTop: '12px' }}
                            >
                                <div className="flex items-center gap-2 pointer-events-auto">
                                    <IoFilmOutline className="text-teal-400 text-xs" />
                                    {animations.length > 0 ? (
                                        <select
                                            value={selectedAnimation}
                                            onChange={(e) => {
                                                setSelectedAnimation(e.target.value);
                                                setIsPlaying(true);
                                            }}
                                            className="bg-slate-950/80 border border-teal-500/30 text-teal-300 text-[10px] font-mono rounded-lg px-2 py-1 outline-none focus:border-teal-400 transition-all cursor-pointer"
                                        >
                                            {animations.map((animName) => (
                                                <option key={animName} value={animName} className="bg-slate-900 text-white">
                                                    {animName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="text-[10px] text-slate-400">Loading animations...</span>
                                    )}
                                </div>

                                {/* Play / Pause Button */}
                                <button
                                    onClick={togglePlayback}
                                    title={isPlaying ? "Pause Animation" : "Play Animation"}
                                    className="pointer-events-auto flex items-center gap-1.5 bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/30 text-teal-300 rounded-lg px-2.5 py-1 text-[10px] font-mono transition-all active:scale-95 cursor-pointer"
                                >
                                    {isPlaying ? (
                                        <>
                                            <FaPause className="text-[9px]" />
                                            <span>PAUSE</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPlay className="text-[9px]" />
                                            <span>PLAY</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>

                        {/* Typography & Actions */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">

                            {/* Main Name & Title */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Montserrat_Alternates'] leading-tight">
                                    Hi, I&apos;m <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">Akshat</span>
                                </h1>
                                
                                <div className="text-base sm:text-lg lg:text-xl font-bold flex flex-wrap items-center justify-center lg:justify-start text-slate-200 gap-1.5 font-mono">
                                    <span className="text-teal-400">&gt;</span>
                                    <span>I&apos;m a</span>
                                    <TypingEffect />
                                </div>
                            </div>

                            {/* Bio Description */}
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg font-normal">
                                I engineer high-performance web platforms, cross-platform mobile apps, and automated systems. Driven by full-stack curiosity and aesthetic quality, I build software designed to solve complex real-world challenges.
                            </p>

                            {/* Primary Action Buttons */}
                            <div 
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full"
                                style={{ paddingTop: '12px' }}
                            >
                                <Link
                                    href="#experience"
                                    className="rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] active:scale-95 text-center flex items-center justify-center gap-2"
                                    style={{ padding: '14px 28px' }}
                                >
                                    <span>View My Work</span>
                                </Link>

                                <Link
                                    href="#contact"
                                    className="rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-teal-500/30 text-white font-semibold text-xs backdrop-blur-md transition-all active:scale-95 text-center hover:border-teal-400/50"
                                    style={{ padding: '14px 28px' }}
                                >
                                    <span>Contact Me</span>
                                </Link>

                                <a
                                    href="/assets/Akshat_Resume_Web.pdf"
                                    download
                                    className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold text-xs backdrop-blur-md transition-all active:scale-95 text-center hover:border-white/30"
                                    style={{ padding: '14px 28px' }}
                                >
                                    <span>Download Resume</span>
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Redesigned Floating Action Resume Button */}
            {isSticky && (
                <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
                    {showOptions && (
                        <div 
                            className="flex flex-col gap-2 min-w-[175px] bg-slate-900/90 border border-teal-500/30 rounded-2xl backdrop-blur-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-3 duration-200"
                            style={{ padding: '12px' }}
                        >
                            <a
                                href="/assets/Akshat_Resume_Web.pdf"
                                download
                                className="flex items-center gap-2.5 rounded-xl bg-white/5 hover:bg-teal-400/10 border border-transparent hover:border-teal-400/30 text-xs font-semibold text-white transition-all"
                                style={{ padding: '10px 14px' }}
                            >
                                <IoIosPaper className="h-4 w-4 text-teal-400" />
                                <span>Web Resume</span>
                            </a>

                            <a
                                href="/assets/Akshat_Resume_Mobile.pdf"
                                download
                                className="flex items-center gap-2.5 rounded-xl bg-white/5 hover:bg-teal-400/10 border border-transparent hover:border-teal-400/30 text-xs font-semibold text-white transition-all"
                                style={{ padding: '10px 14px' }}
                            >
                                <FaFilePdf className="h-4 w-4 text-teal-400" />
                                <span>Mobile Resume</span>
                            </a>
                        </div>
                    )}

                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        title="Download Resume Options"
                        className="flex items-center justify-center rounded-2xl bg-teal-400 text-slate-950 shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:bg-teal-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] transition-all active:scale-90"
                        style={{ width: '52px', height: '52px' }}
                    >
                        {showOptions ? <FaChevronUp size={16} /> : <FaFileAlt size={18} />}
                    </button>
                </div>
            )}
        </>
    );
}