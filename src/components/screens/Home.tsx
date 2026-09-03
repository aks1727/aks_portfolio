'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TypingEffect from "../TypingAnimation";
import { FaFileAlt, FaFilePdf, FaChevronUp, FaPlay, FaPause } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { IoCubeOutline, IoSparklesOutline, IoFilmOutline } from "react-icons/io5";

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
                className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center relative overflow-hidden py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12"
            >
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto w-full flex flex-col items-center my-auto gap-8 sm:gap-10 lg:gap-14 z-10">

                    {/* Badge Title Header */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 border border-teal-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(45,212,191,0.15)] px-4 py-2 sm:px-5 sm:py-2.5">
                        <IoSparklesOutline className="text-teal-400 text-xs sm:text-sm animate-pulse" />
                        <span className="text-[11px] sm:text-xs lg:text-sm font-mono font-semibold text-teal-300 tracking-wider uppercase">
                            Interactive Developer Environment
                        </span>
                    </div>

                    {/* Main Content Layout */}
                    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-14 xl:gap-16">

                        {/* Terminal Window housing 3D Model with Animation Controls */}
                        <div className="w-full lg:w-1/2 h-[340px] sm:h-[420px] lg:h-[460px] xl:h-[520px] 2xl:h-[560px] rounded-3xl border border-teal-500/20 bg-slate-900/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col items-center justify-between relative overflow-hidden group hover:border-teal-400/40 transition-all duration-500 p-4 sm:p-6 lg:p-7">
                            
                            {/* Terminal Top Bar */}
                            <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 sm:pb-3.5 z-10">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
                                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
                                </div>
                                <span className="text-[11px] sm:text-xs font-mono text-teal-300/80 flex items-center gap-1.5">
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
                                        className="w-full h-full bg-transparent"
                                    />
                                )}
                            </div>

                            {/* Terminal Bottom Controls Bar: Dropdown + Play/Pause Button */}
                            <div className="w-full flex items-center justify-between border-t border-white/10 pt-3 sm:pt-3.5 text-xs font-mono text-slate-400 z-10">
                                <div className="flex items-center gap-2 pointer-events-auto">
                                    <IoFilmOutline className="text-teal-400 text-sm" />
                                    {animations.length > 0 ? (
                                        <select
                                            value={selectedAnimation}
                                            onChange={(e) => {
                                                setSelectedAnimation(e.target.value);
                                                setIsPlaying(true);
                                            }}
                                            className="bg-slate-950/80 border border-teal-500/30 text-teal-300 text-[11px] sm:text-xs font-mono rounded-lg px-2.5 py-1.5 outline-none focus:border-teal-400 transition-all cursor-pointer"
                                        >
                                            {animations.map((animName) => (
                                                <option key={animName} value={animName} className="bg-slate-900 text-white">
                                                    {animName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="text-[11px] sm:text-xs text-slate-400">Loading animations...</span>
                                    )}
                                </div>

                                {/* Play / Pause Button */}
                                <button
                                    onClick={togglePlayback}
                                    title={isPlaying ? "Pause Animation" : "Play Animation"}
                                    className="pointer-events-auto flex items-center gap-1.5 bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/30 text-teal-300 rounded-lg px-3 py-1.5 text-[11px] sm:text-xs font-mono transition-all active:scale-95 cursor-pointer"
                                >
                                    {isPlaying ? (
                                        <>
                                            <FaPause className="text-[10px]" />
                                            <span>PAUSE</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPlay className="text-[10px]" />
                                            <span>PLAY</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>

                        {/* Typography & Actions */}
                        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 sm:gap-6 lg:gap-7">

                            {/* Main Name & Title */}
                            <div className="flex flex-col gap-2.5">
                                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight font-['Montserrat_Alternates'] leading-tight">
                                    Hi, I&apos;m <span className="text-teal-400 drop-shadow-[0_0_20px_rgba(45,212,191,0.35)]">Akshat</span>
                                </h1>
                                
                                <div className="text-base sm:text-xl lg:text-2xl font-bold flex flex-wrap items-center justify-center lg:justify-start text-slate-200 gap-2 font-mono">
                                    <span className="text-teal-400">&gt;</span>
                                    <span>I&apos;m a</span>
                                    <TypingEffect />
                                </div>
                            </div>

                            {/* Bio Description */}
                            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                                I engineer high-performance web platforms, cross-platform mobile apps, and automated systems. Driven by full-stack curiosity and aesthetic quality, I build software designed to solve complex real-world challenges.
                            </p>

                            {/* Primary Action Buttons */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full pt-2 sm:pt-4">
                                <Link
                                    href="#experience"
                                    className="rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] active:scale-95 text-center flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5"
                                >
                                    <span>View My Work</span>
                                </Link>

                                <Link
                                    href="#contact"
                                    className="rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-teal-500/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all active:scale-95 text-center hover:border-teal-400/50 px-5 py-3 sm:px-6 sm:py-3.5"
                                >
                                    <span>Contact Me</span>
                                </Link>

                                <a
                                    href="/assets/Akshat_Resume_Web.pdf"
                                    download
                                    className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all active:scale-95 text-center hover:border-white/30 px-5 py-3 sm:px-6 sm:py-3.5"
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
                <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3">
                    {showOptions && (
                        <div className="flex flex-col gap-2 min-w-[185px] bg-slate-900/90 border border-teal-500/30 rounded-2xl backdrop-blur-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-3 duration-200 p-3">
                            <a
                                href="/assets/Akshat_Resume_Web.pdf"
                                download
                                className="flex items-center gap-2.5 rounded-xl bg-white/5 hover:bg-teal-400/10 border border-transparent hover:border-teal-400/30 text-xs sm:text-sm font-semibold text-white transition-all px-3.5 py-2.5"
                            >
                                <IoIosPaper className="h-4 w-4 text-teal-400 shrink-0" />
                                <span>Web Resume</span>
                            </a>

                            <a
                                href="/assets/Akshat_Resume_Mobile.pdf"
                                download
                                className="flex items-center gap-2.5 rounded-xl bg-white/5 hover:bg-teal-400/10 border border-transparent hover:border-teal-400/30 text-xs sm:text-sm font-semibold text-white transition-all px-3.5 py-2.5"
                            >
                                <FaFilePdf className="h-4 w-4 text-teal-400 shrink-0" />
                                <span>Mobile Resume</span>
                            </a>
                        </div>
                    )}

                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        title="Download Resume Options"
                        className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-teal-400 text-slate-950 shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:bg-teal-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] transition-all active:scale-90"
                    >
                        {showOptions ? <FaChevronUp size={16} /> : <FaFileAlt size={18} />}
                    </button>
                </div>
            )}
        </>
    );
}