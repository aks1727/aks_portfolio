'use client';

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaBriefcase, FaCode } from 'react-icons/fa';

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
			className="w-full min-h-screen text-white flex flex-col justify-center items-center py-12"
			style={{ paddingLeft: 'calc(4vw + 1.5rem)', paddingRight: 'calc(4vw + 1.5rem)' }}
		>
			<div className="max-w-6xl w-full mx-auto flex flex-col justify-center gap-10">

				{/* Section Header */}
				<div className="text-center">
					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-['Montserrat_Alternates'] tracking-wide">
						Work Experience
					</h2>
					<p className="text-xs sm:text-sm text-teal-300/80 mt-2 font-medium">
						My professional journey and software engineering contributions
					</p>
				</div>

				{/* Pure Flexbox Container */}
				<div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 w-full">

					{/* Left Navigation Track */}
					<div
						className="flex flex-col gap-4 w-full lg:w-1/3 border-l-2 border-teal-500/30"
						style={{ paddingLeft: '2rem' }}
					>
						{experiences.map((exp) => {
							const isActive = exp.id === activeId;
							return (
								<button
									key={exp.id}
									onClick={() => setActiveId(exp.id)}
									className="relative flex items-center text-left group focus:outline-none w-full"
								>
									{/* Timeline Dot positioned relative to padding */}
									<div
										className={`absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#011940] ${isActive
												? 'border-teal-400 scale-125 shadow-[0_0_12px_rgba(45,212,191,0.8)]'
												: 'border-gray-400 group-hover:border-teal-400'
											}`}
									>
										<div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-teal-400' : 'bg-transparent'}`} />
									</div>

									{/* Tab Item Box */}
									<div
										className={`flex items-center justify-between w-full rounded-xl border transition-all duration-300 ${isActive
												? 'bg-white/10 border-teal-400/80 shadow-md'
												: 'bg-white/5 border-white/10 hover:bg-white/[0.08] hover:border-white/20'
											}`}
										style={{ padding: '1rem 1.25rem' }}
									>
										<div className="min-w-0 pr-3">
											<h3 className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-teal-300' : 'text-white'}`}>
												{exp.companyName}
											</h3>
											<p className="text-[11px] text-gray-400 mt-1 truncate">{exp.roleOffered}</p>
										</div>

										<span
											className={`text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0 whitespace-nowrap ${exp.badgeText === 'Present'
													? 'bg-teal-400/20 text-teal-300 border border-teal-400/30'
													: 'bg-white/10 text-gray-300 border border-white/10'
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
						<div
							className="w-full lg:w-2/3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-300 flex flex-col justify-between"
							style={{ padding: '2rem' }}
						>
							<div>
								{/* Header Info */}
								<div
									className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10"
									style={{ paddingBottom: '1.5rem' }}
								>
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center shrink-0 mt-0.5">
											<FaBriefcase className="text-teal-400 text-xl" />
										</div>

										<div>
											<div className="flex items-center gap-2 flex-wrap">
												<h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
													{activeExperience.roleOffered}
												</h3>
												<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-400/20 border border-teal-400/30 text-teal-300">
													{activeExperience.durationYears}
												</span>
											</div>
											<p className="text-teal-300 font-semibold text-base mt-1">
												{activeExperience.companyName}
											</p>
										</div>
									</div>

									{/* Dates & Location */}
									{/* Replace the date badge div in the header section with this */}
									<div
										className="inline-flex items-center gap-2 bg-teal-400/10 border border-teal-400/30 text-teal-300 rounded-full font-medium text-xs whitespace-nowrap"
										style={{
											paddingLeft: '14px',
											paddingRight: '14px',
											paddingTop: '6px',
											paddingBottom: '6px',
											boxSizing: 'content-box'
										}}
									>
										<FaCalendarAlt className="shrink-0" />
										<span>{activeExperience.start_month} – {activeExperience.end_month}</span>
									</div>
								</div>

								{/* Responsibilities */}
								<div style={{ marginTop: '1.5rem' }}>
									<h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-2">
										<FaCode size={14} />
										Key Responsibilities & Impact
									</h4>
									<ul className="space-y-3" style={{ paddingLeft: '0.5rem' }}>
										{activeExperience.responsibilities.map((item, idx) => (
											<li key={idx} className="text-xs sm:text-sm text-gray-200 leading-relaxed flex items-start gap-3">
												<span className="text-teal-400 font-bold mt-1 text-xs">▹</span>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Skillset */}
							<div className="border-t border-white/10" style={{ marginTop: '2rem', paddingTop: '1.5rem' }}>
								<h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3">
									Technologies & Skillset
								</h4>
								<div className="flex flex-wrap gap-2">
									{activeExperience.skillsGained.map((skill, index) => (
										<span
											key={index}
											className="bg-white/5 border border-white/10 text-gray-200 hover:text-teal-300 hover:border-teal-400/40 text-xs font-medium rounded-lg transition-all"
											style={{ padding: '0.4rem 0.8rem' }}
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