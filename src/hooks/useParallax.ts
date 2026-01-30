import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
    speed?: number;
    direction?: 'up' | 'down';
    disabled?: boolean;
}

export function useParallax<T extends HTMLElement>(options: ParallaxOptions = {}) {
    const { speed = 0.1, direction = 'up', disabled = false } = options;
    const ref = useRef<T>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (disabled) return;

        const element = ref.current;
        if (!element) return;

        let requestAnimationFrameId: number;

        const animate = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            // Calculate distance from center of viewport
            const distanceFromCenter = elementCenter - viewportCenter;

            // Apply parallax effect
            // If direction is 'up', element moves opposite to scroll (standard parallax)
            const dirMultiplier = direction === 'up' ? -1 : 1;
            const targetOffset = distanceFromCenter * speed * dirMultiplier;

            setOffset(targetOffset);

            requestAnimationFrameId = requestAnimationFrame(animate);
        };

        requestAnimationFrameId = requestAnimationFrame(animate);

        return () => {
            if (requestAnimationFrameId) {
                cancelAnimationFrame(requestAnimationFrameId);
            }
        };
    }, [speed, direction, disabled]);

    return { ref, style: { transform: `translate3d(0, ${offset}px, 0)` } };
}
