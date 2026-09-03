'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaCode, FaCheckCircle, FaTimes, FaExpand } from 'react-icons/fa';

interface Technology {
  stack: string;
  ui: string;
  additional?: string;
}

interface Project {
  name: string;
  githubRepo: string | null;
  websiteLink: string | null;
  description: string;
  keyFeatures: string[];
  technologies: Technology;
  imgLink: string;
}

type ProjectCategories = {
  [key: string]: Project[];
};

const projects: ProjectCategories = {
  webProjects: [
    {
      name: "Consultancy Service Platform",
      githubRepo: "ConsultancyService",
      websiteLink: "https://consultancy-service-platform.vercel.app/",
      description:
        "A platform enabling users to connect with top mentors for personalized guidance and knowledge-sharing.",
      keyFeatures: ["Chat communication", "Notifications", "Mentor search"],
      technologies: {
        stack: "MERN Stack",
        ui: "Tailwind CSS",
        additional: "WebSockets",
      },
      imgLink: "/assets/img/project/Web/consultancy.png",
    },
    {
      name: "Music Player Platform",
      githubRepo: "React-Music-player",
      websiteLink: "https://vaiaksh-music.vercel.app/",
      description:
        "An interactive music player platform supporting emerging artists with seamless music playback and upload functionality.",
      keyFeatures: ["Playback controls", "Responsive design", "Audio streaming"],
      technologies: {
        stack: "MERN Stack",
        ui: "Tailwind CSS",
      },
      imgLink: "/assets/img/project/Web/musicPlayer.jpeg",
    },
  ],
  automationProjects: [
    {
      name: "Swag Labs Automation",
      githubRepo: "SwagLabsAutomation",
      websiteLink: null,
      description:
        "An automation testing framework for Swag Labs e-commerce app to validate login, product selection, cart, and checkout workflows.",
      keyFeatures: [
        "Data-driven testing",
        "Page Object Model (POM)",
        "Cross-browser execution",
        "Detailed reporting",
      ],
      technologies: {
        stack: "Java, Selenium WebDriver, TestNG, Maven",
        ui: "Extent Reports",
        additional: "Apache POI, Cucumber (BDD)",
      },
      imgLink: "/assets/img/project/Automation/swaglabs.jpeg",
    },
  ],
  mobileProjects: [
    {
      name: "Currency Converter",
      githubRepo: "ReactNativePractice/tree/main/CurrencyConverter",
      websiteLink: null,
      description:
        "A mobile application for converting currencies in real-time using up-to-date exchange rates.",
      keyFeatures: ["Real-time updates", "Intuitive UI", "Offline access"],
      technologies: {
        stack: "React Native",
        ui: "Custom Components",
        additional: "Exchange Rate API",
      },
      imgLink: "/assets/img/project/Mobile/currenyConverter.jpeg",
    },
  ],
  mlProjects: [
    {
      name: "Employee Burnout Prediction",
      githubRepo: "Employee_Burnot_Prediction_Project",
      websiteLink: null,
      description:
        "A machine learning project aimed at predicting employee burnout by analyzing work patterns, behavior data, and related factors.",
      keyFeatures: ["Preprocessing", "Feature Engineering", "Model Training", "Evaluation"],
      technologies: {
        stack: "Python, scikit-learn, pandas, NumPy",
        ui: "Jupyter Notebook",
        additional: "TensorFlow",
      },
      imgLink: "/assets/img/project/ML/employeeburnoutPrediction.jpeg",
    },
  ],
};

const categories = [
  { label: "Web Projects", key: "webProjects" },
  { label: "Automation", key: "automationProjects" },
  { label: "Mobile Apps", key: "mobileProjects" },
  { label: "Machine Learning", key: "mlProjects" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("webProjects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="w-full min-h-screen bg-transparent text-white flex flex-col justify-center items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-8 sm:gap-10 lg:gap-12 my-auto">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Montserrat_Alternates'] tracking-wide">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-teal-300/80 mt-2 font-medium">
            Click on any project to view complete architecture details, live demos, and source code
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border px-4 py-2 sm:px-5 sm:py-2.5 inline-flex items-center cursor-pointer ${
                  isActive
                    ? "bg-teal-400 text-slate-950 border-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.3)] scale-105"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Compact Grid Items with Action Buttons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {projects[activeCategory]?.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white/5 border border-white/10 hover:border-teal-400/60 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(45,212,191,0.2)] cursor-pointer flex flex-col justify-between p-5 sm:p-6"
              >
                <div>
                  {/* Image Container with Hover Overlay */}
                  <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden bg-black/40 border border-white/10 mb-4">
                    <Image
                      src={project.imgLink}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                      <span className="rounded-lg bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg px-3 py-1.5">
                        <FaExpand size={11} /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition-colors tracking-wide pt-0.5 pb-1.5">
                    {project.name}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-gray-300/80 line-clamp-2 text-left pt-0.5 pb-3.5 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer with Recruiter Action Button */}
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2 mt-2">
                  <span className="text-xs font-semibold text-teal-300/90 truncate">
                    {project.technologies.stack}
                  </span>

                  <button className="rounded-xl bg-teal-400 group-hover:bg-teal-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(45,212,191,0.3)] group-hover:shadow-[0_0_18px_rgba(45,212,191,0.5)] active:scale-95 shrink-0 flex items-center gap-1.5 px-3.5 py-2">
                    <span>View Project</span>
                    <span className="text-sm">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Glassmorphic Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#031d38]/95 border border-teal-500/30 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl backdrop-blur-xl relative p-6 sm:p-8 lg:p-10 [scrollbar-width:thin] [scrollbar-color:#2dd4bf_rgba(255,255,255,0.05)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-teal-400 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 rounded-full bg-white/10 border border-white/10 text-gray-300 hover:text-slate-950 hover:bg-teal-400 hover:border-teal-400 transition-all z-10 p-2.5 cursor-pointer"
              >
                <FaTimes size={14} />
              </button>

              {/* Preview Image */}
              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-black/50 border border-white/10 mb-6">
                <Image
                  src={selectedProject.imgLink}
                  alt={selectedProject.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                {selectedProject.name}
              </h3>

              <p className="text-xs sm:text-sm lg:text-base text-gray-300/90 font-normal leading-relaxed text-left pt-3 pb-5">
                {selectedProject.description}
              </p>

              {/* Key Features */}
              <div className="pb-5">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 pb-2.5">
                  <FaCheckCircle size={13} />
                  Key Features
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {selectedProject.keyFeatures.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-teal-400/10 border border-teal-400/25 text-teal-300 text-xs sm:text-sm font-medium rounded-lg px-3 py-1.5"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pb-6">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 pb-2">
                  <FaCode size={13} />
                  Technologies Used
                </span>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed">
                  <span className="font-semibold text-white">{selectedProject.technologies.stack}</span>
                  {selectedProject.technologies.ui && ` • ${selectedProject.technologies.ui}`}
                  {selectedProject.technologies.additional && ` • ${selectedProject.technologies.additional}`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 border-t border-white/10 pt-5">
                {selectedProject.websiteLink && (
                  <a
                    href={selectedProject.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 inline-flex items-center gap-2 px-5 py-3"
                  >
                    <FaExternalLinkAlt size={12} />
                    <span>Live Demo</span>
                  </a>
                )}

                {selectedProject.githubRepo && (
                  <a
                    href={`https://github.com/aks1727/${selectedProject.githubRepo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all active:scale-95 inline-flex items-center gap-2 px-5 py-3"
                  >
                    <FaGithub size={14} />
                    <span>View GitHub Repo</span>
                  </a>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}