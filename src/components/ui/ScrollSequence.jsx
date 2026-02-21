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
                // Use a wider fade for smoother visual appearance
                const fadeFrames = 8; 
                let opacity = 0;
                let translateY = 20;
                let isVisible = false;

                // Calculate opacity based on frame position (scrubbing effect)
                if (currentFrame >= seq.start && currentFrame <= seq.end) {
                    isVisible = true;
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

                // Optimization: completely detach from layout calculus if not visible
                if (!isVisible) {
                    if (el.dataset.v !== 'hidden') {
                        el.style.display = 'none';
                        el.dataset.v = 'hidden';
                    }
                    return;
                }

                if (el.dataset.v !== 'visible') {
                    el.style.display = 'block';
                    el.dataset.v = 'visible';
                }

                // Format values for string comparison
                const newOpacity = opacity.toFixed(2);
                const newTransform = `translate3d(0px, ${translateY.toFixed(1)}px, 0px)`;

                // Apply styles directly only if they changed to prevent layout thrashing
                if (el.dataset.o !== newOpacity) {
                    el.style.opacity = newOpacity;
                    el.dataset.o = newOpacity;
                }
                
                if (el.dataset.t !== newTransform) {
                     el.style.transform = newTransform;
                     el.dataset.t = newTransform;
                }
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

        let renderParams = null;
        let lastRenderedFrame = -1;

        let renderAnimFrame = null;

        function render() {
            if (renderAnimFrame) cancelAnimationFrame(renderAnimFrame);

            renderAnimFrame = requestAnimationFrame(() => {
                const frameIndex = Math.round(frames.current);
                // Skip re-rendering the exact same frame again
                if (frameIndex === lastRenderedFrame && renderParams) return;
                
                const img = images[frameIndex];
                if (!img) return;

                // Cache layout parameters to avoid recalculating every frame
                if (!renderParams || renderParams.img !== img) {
                    const hRatio = canvas.width / img.width;
                    const vRatio = canvas.height / img.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const centerShift_x = (canvas.width - img.width * ratio) / 2;
                    const centerShift_y = (canvas.height - img.height * ratio) / 2;
                    renderParams = { ratio, centerShift_x, centerShift_y, img };
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(
                    img, 
                    0, 0, img.width, img.height,
                    renderParams.centerShift_x, renderParams.centerShift_y, 
                    img.width * renderParams.ratio, img.height * renderParams.ratio
                );

                lastRenderedFrame = frameIndex;

                // Determine active text based on current frame
                updateTextVisibility(frameIndex);
            });
        }

        const resizeCanvas = () => {
             // Sacrifice internal resolution for a massive performance boost.
             // Rendering at 40-60% resolution drastically reduces pixel calculations per frame.
             const qualityScale = window.innerWidth <= 768 ? 0.4 : 0.6; 
             canvas.width = window.innerWidth * qualityScale;
             canvas.height = window.innerHeight * qualityScale;
             
             // Optimize image rendering strategy
             context.imageSmoothingEnabled = true;
             context.imageSmoothingQuality = "low";

             renderParams = null; // Force recalculation
             lastRenderedFrame = -1; // Force re-render
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
                scrub: 1.2, // Further increase scrub to smooth out trackpad inertia completely
                pin: true,
                fastScrollEnd: true,
                preventOverlaps: true,
                anticipatePin: 1, // Helps with trackpad pin shudder
            },
            onUpdate: render
        });

        return () => {
             if (renderAnimFrame) cancelAnimationFrame(renderAnimFrame);
            window.removeEventListener("resize", resizeCanvas);
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 overflow-hidden">
            {/* 
                Canvas uses w-full h-full to stretch the lower-res internal render up to the screen size. 
                Removed expensive CSS filters (`dark:brightness`, `transition-all`) from this element because changing effects on a repainting canvas is extremely CPU/GPU heavy.
            */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                style={{ willChange: 'contents' }}
            />
            
            {/* Extremely lightweight dark mode overlay rather than filtering the actively animating canvas */}
            <div className="absolute inset-0 bg-transparent dark:bg-black/60 pointer-events-none z-0" />

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
                        className="absolute text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter text-left max-w-4xl"
                        style={{ display: 'none', opacity: 0, transform: 'translate3d(0px, 20px, 0px)', willChange: 'opacity, transform' }}
                    >
                        {seq.text}
                    </h2>
                ))}
            </div>
        </div>
    );
};

export default ScrollSequence;
