import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Normalize scroll to help with trackpad high-frequency events
ScrollTrigger.normalizeScroll(true);
ScrollTrigger.config({ ignoreMobileResize: true });

const ScrollSequence = ({ 
    folderPath = '/sequence', 
    frameCount = 240, 
    imagePrefix = 'frame_', 
    imageSuffix = '.jpg', 
    padZeros = 4,
    sequences = [], // Passed from parent
    children
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const fallbackImgRef = useRef(null);
    
    const firstFrameSrc = `${folderPath}/${imagePrefix}${String(1).padStart(padZeros, '0')}${imageSuffix}`;



    const sequencesRefs = useRef([]);

    useGSAP(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { alpha: false }); // Optimize canvas for opaque images
        
        // 1. Preload Images simply
        const images = [];
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const paddedIndex = String(i).padStart(padZeros, '0');
            img.src = `${folderPath}/${imagePrefix}${paddedIndex}${imageSuffix}`;
            images.push(img);
        }

        // 2. Simple Render Function
        const renderFrame = (index) => {
            const img = images[index];
            if (!img || !img.complete || img.naturalHeight === 0) return;

            // Simple scaling to fill screen
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        // 3. Application State & Resize handler
        const frames = { current: 0 };

        const handleResize = () => {
             // Use full resolution for crispness, modern devices can handle it if we don't over-engineer JS
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             renderFrame(Math.round(frames.current));
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        // Ensure first frame renders
        if (images.length > 0) {
            const loadFirstFrame = () => {
                renderFrame(0);
                if (fallbackImgRef.current) {
                    gsap.to(fallbackImgRef.current, { autoAlpha: 0, duration: 0.5, ease: "power1.out" });
                }
            };
            
            if (images[0].complete) {
                // In case it's already cached and loaded
                loadFirstFrame();
            } else {
                images[0].onload = loadFirstFrame;
            }
        }

        // 4. Create a single, clean GSAP Timeline for EVERYTHING
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%",
                scrub: 0.5, // 0.5 is the golden ratio for smoothing out trackpads without feeling sluggish
                pin: true,
            }
        });

        // Add the canvas sequence animation to the timeline
        tl.to(frames, {
            current: frameCount - 1,
            snap: "current",
            ease: "none",
            onUpdate: () => renderFrame(Math.round(frames.current))
        }, 0); // Start at timeline 0

        // 5. Add element animations declaratively to the same timeline 
        sequencesRefs.current.forEach((el, index) => {
            if (!el) return;
            const seq = sequences[index];
            
            // Calculate relative times (0 to 1) based on frame counts
            const startTime = seq.start / frameCount;
            const endTime = seq.end / frameCount;
            const fadeTime = 20 / frameCount; // 20 frames of fade for smoother transitions with complex elements

            // Initialize position. If it starts at 0, it should be fully visible immediately.
            if (startTime === 0) {
                gsap.set(el, { autoAlpha: 1, y: 0 });
            } else {
                gsap.set(el, { autoAlpha: 0, y: 30 });

                // Animate In
                tl.to(el, {
                    autoAlpha: 1,
                    y: 0,
                    duration: fadeTime,
                    ease: "power1.out"
                }, startTime);
            }

            // Animate Out (unless it's set to persist or it's the last item and shouldn't fade out)
            if (!seq.persist) {
                tl.to(el, {
                    autoAlpha: 0,
                    y: -30,
                    duration: fadeTime,
                    ease: "power1.in"
                }, endTime - fadeTime);
            }
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            tl.kill(); // Cleanup timeline
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-500">
            
            {/* 1. Canvas at bottom */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-none" 
            />

            {/* 1.5 Fallback First Frame (Covers black canvas until loaded) */}
            <img 
                ref={fallbackImgRef}
                src={firstFrameSrc}
                alt="sequence fallback"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            
            {/* 2. Static Dark Overlay (Only visible in dark mode to dim the bright images) */}
            <div className="absolute inset-0 bg-transparent dark:bg-black/40 pointer-events-none z-0 transition-colors duration-500" />

            {/* 3. Sequence Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {sequences.map((seq, index) => (
                    <div 
                        key={index}
                        ref={el => sequencesRefs.current[index] = el}
                        className={`absolute inset-0 flex flex-col justify-center pointer-events-auto ${seq.className || ''}`}
                    >
                        {seq.content}
                    </div>
                ))}
            </div>
            
            {/* 4. Other Children */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center">
                {children}
            </div>
        </div>
    );
};

export default ScrollSequence;
