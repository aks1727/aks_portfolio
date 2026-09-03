'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Home,
    Info,
    Briefcase,
    FolderGit2,
    Phone,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';

const routes = [
    { label: 'Home', icon: Home, path: '#home' },
    { label: 'About Me', icon: Info, path: '#about' },
    {
        label: 'Experience',
        icon: Briefcase,
        path: '#experience',
        hasDropdown: false,
        dropdownItems: [
            { label: 'Internships', path: '#internships' },
            { label: 'Full-time', path: '#fulltime' },
        ]
    },
    {
        label: 'Projects',
        icon: FolderGit2,
        path: '#projects',
        hasDropdown: true,
        dropdownItems: [
            { label: 'Web Development', path: '#web' },
            { label: 'Mobile Apps', path: '#mobile' },
            { label: 'Automation Testing', path: '#automation' },
        ]
    },
    { label: 'Contact', icon: Phone, path: '#contact', hasDropdown: false }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full px-4 sm:px-8 transition-colors duration-300 ${
                isScrolled
                    ? 'bg-[#0851bf]/10 backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="flex h-16 sm:h-20 items-center justify-between lg:justify-center">
                
                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center rounded-md bg-[#0851bf] p-2 text-white lg:hidden hover:bg-[#0851bf]/80 transition-colors"
                    aria-label="Toggle Navigation"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Original Desktop Navigation Links */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {routes.map((route) => {
                        const Icon = route.icon;

                        if (!route.hasDropdown) {
                            return (
                                <Link
                                    key={route.label}
                                    href={route.path}
                                    className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200 transition-colors"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{route.label}</span>
                                </Link>
                            );
                        }

                        return (
                            <div key={route.label} className="relative group">
                                <button
                                    className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200 transition-colors"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{route.label}</span>
                                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                                </button>

                                {/* Exact Original Desktop Dropdown Menu */}
                                <div className="absolute px-4 py-2 left-0 mt-2 hidden w-48 flex-col rounded-md border border-white/10 bg-[radial-gradient(circle_at_top,_#085195_10%,_#03386a_30%,_#011950_80%)] p-2 shadow-xl group-hover:flex">
                                    {route.dropdownItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.path}
                                            className="rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <nav className="flex flex-col gap-4 py-4 font-bold lg:hidden border-t border-white/10">
                    {routes.map((route) => {
                        const Icon = route.icon;

                        if (!route.hasDropdown) {
                            return (
                                <Link
                                    key={route.label}
                                    href={route.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{route.label}</span>
                                </Link>
                            );
                        }

                        return (
                            <div key={route.label} className="flex flex-col gap-2">
                                <button
                                    onClick={() => toggleDropdown(route.label)}
                                    className="flex items-center justify-between text-white hover:text-blue-200 transition-colors"
                                >
                                    <span className="flex items-center gap-2">
                                        <Icon className="h-5 w-5" />
                                        {route.label}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${
                                            openDropdown === route.label ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Mobile Accordion Dropdown */}
                                {openDropdown === route.label && (
                                    <div className="ml-6 flex flex-col gap-2 border-l-2 border-white/20 pl-4">
                                        {route.dropdownItems.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.path}
                                                onClick={() => setIsOpen(false)}
                                                className="text-sm font-normal text-gray-200 hover:text-white transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}