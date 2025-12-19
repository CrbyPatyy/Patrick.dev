'use client';

import { useState } from 'react';

interface TextRevealProps {
    text: string;
    className?: string;
}

export default function MagneticText({ text, className = "" }: TextRevealProps) {
    const [isHovered, setIsHovered] = useState(false);

    const characters = text.split("");

    return (
        <div
            className={`relative inline-flex items-center justify-center cursor-pointer overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden flex">
                {characters.map((char, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden"
                        style={{
                            height: '1.2em',
                            width: char === " " ? '0.3em' : 'auto',
                        }}
                    >
                        <div
                            className="flex flex-col"
                            style={{
                                transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
                                transitionDelay: `${i * 0.02}s`,
                                transform: isHovered ? 'translateY(-50%)' : 'translateY(0%)'
                            }}
                        >
                            {/* Primary character */}
                            <span className="block leading-[1.2em]">
                                {char === " " ? "\u00A0" : char}
                            </span>
                            {/* Reveal character */}
                            <span className="block leading-[1.2em]">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
