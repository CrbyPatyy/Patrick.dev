'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MarqueeProps {
    text: string;
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
    separator?: string;
}

export default function Marquee({
    text,
    speed = 30,
    direction = 'left',
    className = '',
    separator = ' • '
}: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const track1Ref = useRef<HTMLDivElement>(null);
    const track2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !track1Ref.current || !track2Ref.current) return;

        const track1 = track1Ref.current;
        const track2 = track2Ref.current;
        const trackWidth = track1.offsetWidth;

        // Position second track right after the first
        gsap.set(track2, { x: trackWidth });

        const dirMultiplier = direction === 'left' ? -1 : 1;
        const duration = trackWidth / speed;

        // Create seamless loop
        const tl = gsap.timeline({ repeat: -1 });

        tl.to([track1, track2], {
            x: `+=${dirMultiplier * trackWidth}`,
            duration,
            ease: 'none',
            modifiers: {
                x: gsap.utils.unitize((x: number) => {
                    const val = parseFloat(String(x));
                    if (direction === 'left') {
                        return val < -trackWidth ? val + trackWidth * 2 : val;
                    } else {
                        return val > trackWidth ? val - trackWidth * 2 : val;
                    }
                }),
            },
        });

        return () => {
            tl.kill();
        };
    }, [direction, speed]);

    const repeatedText = `${text}${separator}`.repeat(8);

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden whitespace-nowrap ${className}`}
        >
            <div className="inline-flex">
                <div
                    ref={track1Ref}
                    className="inline-block shrink-0"
                    aria-hidden="true"
                >
                    {repeatedText}
                </div>
                <div
                    ref={track2Ref}
                    className="inline-block shrink-0"
                    aria-hidden="true"
                >
                    {repeatedText}
                </div>
            </div>
        </div>
    );
}
