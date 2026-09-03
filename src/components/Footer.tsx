import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full bg-transparent text-white border-t border-white/10 py-6 sm:py-8 lg:py-10 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-4 sm:gap-5">

                {/* Social Links */}
                <div className="flex items-center gap-6 sm:gap-8">
                    <a
                        href="https://github.com/aks1727"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-slate-300 hover:text-teal-300 transition-colors p-1"
                    >
                        <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>

                    <a
                        href="https://linkedin.com/in/akshatkumarsinha1704"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-slate-300 hover:text-teal-300 transition-colors p-1"
                    >
                        <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>

                    <a
                        href="mailto:kumarsinhaakshat8@gmail.com"
                        aria-label="Email"
                        className="text-slate-300 hover:text-teal-300 transition-colors p-1"
                    >
                        <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-xs sm:text-sm text-slate-400 font-normal tracking-wide">
                    &copy; {new Date().getFullYear()} Akshat Kumar Sinha. All rights reserved.
                </p>
            </div>
        </footer>
    );
}