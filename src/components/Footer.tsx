import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#011940] text-white py-6">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">

                {/* Social Links */}
                <div className="flex items-center gap-6 mb-4">
                    <a
                        href="https://github.com/aks1727"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-white hover:text-blue-400 transition-colors"
                    >
                        <FaGithub className="w-6 h-6" />
                    </a>

                    <a
                        href="https://linkedin.com/in/akshatkumarsinha1704"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-white hover:text-blue-400 transition-colors"
                    >
                        <FaLinkedin className="w-6 h-6" />
                    </a>

                    <a
                        href="mailto:kumarsinhaakshat8@gmail.com"
                        aria-label="Email"
                        className="text-white hover:text-blue-400 transition-colors"
                    >
                        <FaEnvelope className="w-6 h-6" />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Akshat Kumar Sinha. All rights reserved.
                </p>
            </div>
        </footer>
    );
}