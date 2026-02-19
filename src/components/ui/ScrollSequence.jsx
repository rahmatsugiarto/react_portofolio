import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollSequence = ({ 
    folderPath = '/sequence', 
    frameCount = 240, 
    imagePrefix = 'frame_', 
    imageSuffix = '.jpg', 
    padZeros = 4,
    children
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const textSequences = [
        { start: 30, end: 80, text: "I Build Mobile Apps." },
        { start: 90, end: 140, text: "Flutter & Native Android." },
        { start: 150, end: frameCount, text: "Let's Create Something Amazing." }
    ];

    const textRefs = useRef([]);

    useGSAP(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const frames = { current: 0 };
        const images = [];

        // Helper to manually update DOM to avoid React render cycle overhead on 60fps loop
        const updateTextVisibility = (currentFrame) => {
            textRefs.current.forEach((el, i) => {
                if (!el) return;
                
                const seq = textSequences[i];
                // Sharper fade for better visibility on fast scrolls
                const fadeFrames = 5; 
                let opacity = 0;
                let translateY = 20;

                // Calculate opacity based on frame position (scrubbing effect)
                if (currentFrame >= seq.start && currentFrame <= seq.end) {
                    if (currentFrame < seq.start + fadeFrames) {
                        // Fading in
                        const progress = (currentFrame - seq.start) / fadeFrames;
                        opacity = progress;
                        translateY = 20 * (1 - progress);
                    } else if (currentFrame > seq.end - fadeFrames && i !== textSequences.length - 1) {
                        // Fading out (except for the last one)
                        const progress = (seq.end - currentFrame) / fadeFrames;
                        opacity = progress;
                        translateY = -20 * (1 - progress);
                    } else {
                        // Fully visible
                        opacity = 1;
                        translateY = 0;
                    }
                }

                // Apply styles directly for best performance
                el.style.opacity = Math.max(0, Math.min(1, opacity));
                el.style.transform = `translateY(${translateY}px)`;
            });
        };

        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const formattedIndex = String(i).padStart(padZeros, '0');
            img.src = `${folderPath}/${imagePrefix}${formattedIndex}${imageSuffix}`;
            img.onerror = () => console.error(`Failed to load image: ${img.src}`);
            images.push(img);
        }

        function render() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const img = images[frames.current];
            
            if (img) {
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;
                
                context.drawImage(
                    img, 
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }

            // Determine active text based on current frame
            updateTextVisibility(frames.current);
        }

        const resizeCanvas = () => {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             render();
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        if (images.length > 0) {
            images[0].onload = render;
        }

        gsap.to(frames, {
            current: frameCount - 1,
            snap: "current",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // Shortened duration (faster)
                scrub: 0, // Instant scrubbing to prevent lag/skipping on fast scrolls
                pin: true,
            },
            onUpdate: render
        });

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-background-light dark:bg-background-dark transition-colors duration-500">
            <canvas ref={canvasRef} className="block mx-auto max-w-full max-h-full dark:opacity-40 dark:brightness-90 transition-all duration-500" />
            
            {/* Hero specific content (or any children) */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center">
                {children}
            </div>

            {/* Scroll Sequence Text Overlays */}
            <div className="absolute inset-0 flex items-center justify-start z-10 pointer-events-none pl-8 md:pl-24">
                {textSequences.map((seq, index) => (
                    <h2 
                        key={index}
                        ref={el => textRefs.current[index] = el}
                        className="absolute text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter text-left max-w-4xl transition-colors duration-500"
                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                    >
                        {seq.text}
                    </h2>
                ))}
            </div>
        </div>
    );
};

export default ScrollSequence;
