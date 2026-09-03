'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  SiPython, SiJavascript, SiTypescript,
  SiReact, SiRedux, SiTailwindcss, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiSocketdotio,
  SiGit, SiGithub, SiPostman, SiNetlify, SiVercel, SiJsonwebtokens, SiJenkins, SiDocker,
  SiSelenium, SiCucumber, SiJira, SiTestinglibrary, SiUnity
} from 'react-icons/si';

import { TbBrandCpp, TbBrandCSharp } from 'react-icons/tb';
import { FaHtml5, FaCss3Alt, FaJava, FaCode, FaLaptopCode, FaDatabase, FaTools, FaRobot, FaGamepad } from 'react-icons/fa';

interface Skill {
  label: string;
  icon: React.ReactNode;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Languages & Core",
    icon: <FaCode className="text-teal-400 text-lg sm:text-xl shrink-0" />,
    skills: [
      { label: "C++", icon: <TbBrandCpp /> },
      { label: "C#", icon: <TbBrandCSharp /> },
      { label: "Java", icon: <FaJava /> },
      { label: "Python", icon: <SiPython /> },
      { label: "TypeScript", icon: <SiTypescript /> },
      { label: "JavaScript", icon: <SiJavascript /> },
      { label: "HTML5", icon: <FaHtml5 /> },
      { label: "CSS3", icon: <FaCss3Alt /> },
    ],
  },
  {
    title: "Frontend & Web UI",
    icon: <FaLaptopCode className="text-teal-400 text-lg sm:text-xl shrink-0" />,
    skills: [
      { label: "Next.js", icon: <SiNextdotjs /> },
      { label: "React", icon: <SiReact /> },
      { label: "Redux", icon: <SiRedux /> },
      { label: "Tailwind CSS", icon: <SiTailwindcss /> },
    ],
  },
  {
    title: "Backend & Databases",
    icon: <FaDatabase className="text-teal-400 text-lg sm:text-xl shrink-0" />,
    skills: [
      { label: "Node.js", icon: <SiNodedotjs /> },
      { label: "Express.js", icon: <SiExpress /> },
      { label: "MongoDB", icon: <SiMongodb /> },
      { label: "MySQL", icon: <SiMysql /> },
      { label: "Socket.io", icon: <SiSocketdotio /> },
      { label: "JWT", icon: <SiJsonwebtokens /> },
    ],
  },
  {
    title: "Game & Interactive Dev",
    icon: <FaGamepad className="text-teal-400 text-lg sm:text-xl shrink-0" />,
    skills: [
      { label: "Unity", icon: <SiUnity /> },
      { label: "C# Logic", icon: <TbBrandCSharp /> },
    ],
  },
  {
    title: "DevOps & Cloud Tools",
    icon: <FaTools className="text-teal-400 text-lg sm:text-xl shrink-0" />,
    skills: [
      { label: "Docker", icon: <SiDocker /> },
      { label: "Jenkins", icon: <SiJenkins /> },
      { label: "Git", icon: <SiGit /> },
      { label: "GitHub", icon: <SiGithub /> },
      { label: "Postman", icon: <SiPostman /> },
      { label: "Vercel", icon: <SiVercel /> },
      { label: "Netlify", icon: <SiNetlify /> },
    ],
  },
  {
    title: "Automation & QA",
    icon: <FaRobot className="text-teal-400 text-lg sm:text-xl shrink-0" />,
    skills: [
      { label: "Selenium", icon: <SiSelenium /> },
      { label: "Cucumber", icon: <SiCucumber /> },
      { label: "Jira", icon: <SiJira /> },
      { label: "Manual Testing", icon: <SiTestinglibrary /> },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="w-full min-h-screen bg-transparent text-white flex flex-col justify-center items-center py-16 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-10">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-['Montserrat_Alternates'] tracking-wide">
            Technical Stack & Skills
          </h2>
          <p className="text-xs sm:text-sm text-teal-300/80 mt-2 font-medium">
            Core technologies, frameworks, and engines I utilize across software engineering
          </p>
        </div>

        {/* Vertical Stacked Cards */}
        <div className="flex flex-col gap-6 w-full">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white/5 border border-teal-500/20 rounded-2xl backdrop-blur-md shadow-xl hover:border-teal-400/50 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              style={{ padding: '24px 28px' }}
            >
              {/* Category Title Column */}
              <div className="flex items-center gap-3.5 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/30 flex items-center justify-center shrink-0">
                  {category.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Skills Wrap Area */}
              <div className="flex flex-wrap items-center gap-3 lg:w-2/3">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 rounded-xl bg-teal-400/10 border border-teal-400/25 text-teal-200 hover:text-white hover:bg-teal-400/20 hover:border-teal-400/60 hover:shadow-[0_0_12px_rgba(45,212,191,0.3)] transition-all duration-300 cursor-default whitespace-nowrap"
                    style={{ padding: '10px 18px', display: 'inline-flex', boxSizing: 'content-box' }}
                  >
                    <span className="text-base text-teal-300 shrink-0">
                      {skill.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}