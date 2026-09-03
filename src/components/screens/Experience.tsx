'use client';

import React, { useState } from 'react';
import { FaCalendarAlt, FaBriefcase, FaCode } from 'react-icons/fa';

const experiences = [
    {
        id: 1,
        companyName: 'Cognizant',
        roleOffered: 'Programmer Analyst Trainee',
        durationYears: '1 Yr',
        badgeText: 'Present',
        start_month: 'September 2025',
        end_month: 'Present',
        companyLocation: 'Kolkata, West Bengal',
        workLocation: 'On-site',
        responsibilities: [
            'Engineered and scaled modern web applications utilizing React.js, Node.js, and MongoDB.',
            'Automated quality assurance and end-to-end testing pipelines using Selenium.',
            'Collaborated with cross-functional teams to build high-performance software and optimize full-stack application reliability.'
        ],
        skillsGained: [
            'React.js',
            'Node.js',
            'MongoDB',
            'Selenium Automation',
            'Quality Assurance',
            'JavaScript (ES6+)',
            'RESTful APIs'
        ],
    },
    {
        id: 2,
        companyName: 'Technical Hub',
        roleOffered: 'Full Stack Web Developer Intern',
        durationYears: '8 Mos',
        badgeText: '2024',
        start_month: 'January 2024',
        end_month: 'August 2024',
        companyLocation: 'Surampalem, Andhra Pradesh',
        workLocation: 'On-site',
        responsibilities: [
            'Gained intensive hands-on experience in full-stack web technologies and software engineering fundamentals.',
            'Developed responsive user interfaces using React, Redux, and Tailwind CSS.',
            'Designed and integrated RESTful APIs with Node.js and Express to manage dynamic datasets effectively.'
        ],
        skillsGained: [
            'React.js',
            'Redux',
            'Node.js',
            'Express.js',
            'Tailwind CSS',
            'Git / GitHub',
            'Problem Solving'
        ],
    },
];

export default function Experience() {
    const [activeId, setActiveId] = useState(experiences[0].id);
    const activeExperience = experiences.find((exp) => exp.id === activeId);

    return (
        <section
            id="experience"
            className="w-full min-h-screen bg-transparent text-white flex flex-col justify-center items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12"
        >
            <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-10 sm:gap-12 lg:gap-14">

                {/* Section Header */}
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Montserrat_Alternates'] tracking-wide">
                        Work Experience
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base text-teal-300/80 mt-2 font-medium">
                        My professional journey and software engineering contributions
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-10 xl:gap-12 w-full">

                    {/* Left Navigation Track */}
                    <div className="flex flex-col gap-4 w-full lg:w-1/3 border-l-2 border-teal-500/30 pl-6 sm:pl-8">
                        {experiences.map((exp) => {
                            const isActive = exp.id === activeId;
                            return (
                                <button
                                    key={exp.id}
                                    onClick={() => setActiveId(exp.id)}
                                    className="relative flex items-center text-left group focus:outline-none w-full cursor-pointer"
                                >
                                    {/* Timeline Node */}
                                    <div
                                        className={`absolute -left-[33px] sm:-left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#020b14] ${
                                            isActive
                                                ? 'border-teal-400 scale-125 shadow-[0_0_14px_rgba(45,212,191,0.8)]'
                                                : 'border-slate-500 group-hover:border-teal-400'
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-teal-400' : 'bg-transparent'}`} />
                                    </div>

                                    {/* Tab Item Box */}
                                    <div
                                        className={`flex items-center justify-between w-full rounded-2xl border transition-all duration-300 px-4 py-3.5 sm:px-5 sm:py-4 ${
                                            isActive
                                                ? 'bg-white/10 border-teal-400/80 shadow-[0_0_20px_rgba(45,212,191,0.15)]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                                        }`}
                                    >
                                        <div className="min-w-0 pr-3">
                                            <h3 className={`text-xs sm:text-sm lg:text-base font-bold truncate ${isActive ? 'text-teal-300' : 'text-white'}`}>
                                                {exp.companyName}
                                            </h3>
                                            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 truncate">{exp.roleOffered}</p>
                                        </div>

                                        <span
                                            className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md shrink-0 whitespace-nowrap ${
                                                exp.badgeText === 'Present'
                                                    ? 'bg-teal-400/20 text-teal-300 border border-teal-400/30'
                                                    : 'bg-white/10 text-slate-300 border border-white/10'
                                            }`}
                                        >
                                            {exp.durationYears}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Detail Card */}
                    {activeExperience && (
                        <div className="w-full lg:w-2/3 bg-slate-900/40 border border-teal-500/20 rounded-3xl backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 flex flex-col justify-between p-5 sm:p-7 lg:p-9">
                            <div>
                               {/* Header Info */}
<div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 border-b border-white/10 pb-5 sm:pb-6">
    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center shrink-0 mt-1">
            <FaBriefcase className="text-teal-400 text-base sm:text-lg" />
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight">
                    {activeExperience.roleOffered}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-teal-400/20 border border-teal-400/30 text-teal-300 shrink-0">
                    {activeExperience.durationYears}
                </span>
            </div>
            <p className="text-teal-300 font-semibold text-xs sm:text-sm md:text-base">
                {activeExperience.companyName}
            </p>
        </div>
    </div>

    {/* Dates & Duration Badge */}
    <div className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/30 text-teal-300 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 shrink-0 self-start xl:self-center">
        <FaCalendarAlt className="shrink-0 text-xs" />
        <span>{activeExperience.start_month} – {activeExperience.end_month}</span>
    </div>
</div>

                                {/* Responsibilities */}
                                <div className="mt-5 sm:mt-7">
                                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400 mb-3.5 flex items-center gap-2">
                                        <FaCode className="text-sm" />
                                        Key Responsibilities & Impact
                                    </h4>
                                    <ul className="space-y-2.5 sm:space-y-3 pl-1 sm:pl-2">
                                        {activeExperience.responsibilities.map((item, idx) => (
                                            <li key={idx} className="text-xs sm:text-sm lg:text-[15px] text-slate-200 leading-relaxed flex items-start gap-2.5 sm:gap-3">
                                                <span className="text-teal-400 font-bold mt-1 text-xs shrink-0">▹</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Skillset */}
                            <div className="border-t border-white/10 mt-7 pt-5 sm:mt-8 sm:pt-6">
                                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400 mb-3">
                                    Technologies & Skillset
                                </h4>
                                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                    {activeExperience.skillsGained.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/5 border border-white/10 text-slate-200 hover:text-teal-300 hover:border-teal-400/40 text-xs sm:text-sm font-medium rounded-xl transition-all px-3 py-1.5 sm:px-3.5"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                </div>

            </div>
        </section>
    );
}