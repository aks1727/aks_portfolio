'use client';

import React, { useState, useEffect } from "react";

const jobTitles = [
  "Web Developer",
  "React Native Developer",
  "3D Graphics Enthusiast",
];

export default function TypingEffect() {
  const [currentText, setCurrentText] = useState("");
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentJob = jobTitles[currentJobIndex];

      if (isDeleting) {
        setCurrentText(currentJob.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setTypingSpeed(50); // Faster speed when deleting
      } else {
        setCurrentText(currentJob.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setTypingSpeed(100); // Normal speed when typing
      }

      // Pause at full length before deleting
      if (!isDeleting && charIndex === currentJob.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } 
      // Switch to next string when cleared
      else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentText("");
        setCurrentJobIndex((prev) => (prev + 1) % jobTitles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentJobIndex, typingSpeed]);

  return (
    <span className="inline-flex items-center text-lg sm:text-xl md:text-2xl font-bold">
      <span className="text-[#67E6DC]">{currentText}</span>
      <span className="text-gray-400 animate-pulse ml-0.5">|</span>
    </span>
  );
}