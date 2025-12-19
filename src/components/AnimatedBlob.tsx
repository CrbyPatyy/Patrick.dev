'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBlob() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Blob parameters
        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) * 0.4;

            // Create blob path
            ctx.beginPath();
            const points = 12;
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const noise = Math.sin(time + i * 0.5) * 0.2;
                const r = radius * (1 + noise);
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();

            // More visible gradient
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.08)');
            gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.04)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fill();

            // Stroke for definition
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
            ctx.lineWidth = 2;
            ctx.stroke();

            time += 0.015;
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
}
