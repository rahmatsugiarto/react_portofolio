import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Normalize scroll to help with trackpad high-frequency events (Disabled to allow swipe-to-back gestures)
// ScrollTrigger.normalizeScroll(true);
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
        
        // 1. Progressive Image Preloader
        const images = [];
        const criticalFrames = 15;
        let cachedScale = 0;
        let cachedX = 0;
        let cachedY = 0;
        let cachedW = 0;
        let cachedH = 0;

        // Initialize all Image objects
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            images.push(img);
        }

        // Helper to load a specific frame
        const loadFrame = (index) => {
            if (index < 0 || index >= frameCount) return Promise.resolve(null);
            const img = images[index];
            if (img.src) return Promise.resolve(img); // Already loading or loaded
            
            return new Promise((resolve) => {
                const paddedIndex = String(index + 1).padStart(padZeros, '0');
                img.onload = () => {
                    // If this was the current frame, force a redraw
                    const currentFrame = Math.round(frames.current);
                    if (currentFrame === index) {
                        renderFrame(index);
                    }
                    resolve(img);
                };
                img.onerror = () => resolve(null);
                img.src = `${folderPath}/${imagePrefix}${paddedIndex}${imageSuffix}`;
            });
        };

        // 2. Simple Render Function
        const renderFrame = (index) => {
            const img = images[index];
            if (!img) return;
            
            // If the frame isn't loaded yet, try to load it on-demand
            if (!img.complete || img.naturalHeight === 0) {
                loadFrame(index);
                return;
            }

            // Compute scaling metrics only once per resize
            if (cachedScale === 0) {
                cachedScale = Math.max(canvas.width / img.width, canvas.height / img.height);
                cachedX = (canvas.width / 2) - (img.width / 2) * cachedScale;
                cachedY = (canvas.height / 2) - (img.height / 2) * cachedScale;
                cachedW = img.width * cachedScale;
                cachedH = img.height * cachedScale;
            }

            context.drawImage(img, cachedX, cachedY, cachedW, cachedH);
        };

        // 3. Application State & Resize handler
        const frames = { current: 0 };
        let lastRenderedFrame = -1;

        const handleResize = () => {
             // Use full resolution for crispness
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             // Reset cache
             cachedScale = 0;
             // Force render
             lastRenderedFrame = -1;
             renderFrame(Math.round(frames.current));
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        // Load critical frames first
        const loadCritical = async () => {
            const promises = [];
            for (let i = 0; i < Math.min(criticalFrames, frameCount); i++) {
                promises.push(loadFrame(i));
            }
            await Promise.all(promises);

            // Ensure first frame renders
            renderFrame(0);
            if (fallbackImgRef.current) {
                gsap.to(fallbackImgRef.current, { autoAlpha: 0, duration: 0.5, ease: "power1.out" });
            }

            // Delay loading the rest until after window loads or a timeout (to prevent network contention)
            const startRemainingLoad = () => {
                const batchSize = 6;
                let currentIndex = criticalFrames;

                const loadNextBatch = async () => {
                    if (currentIndex >= frameCount) return;
                    const batchPromises = [];
                    for (let i = 0; i < batchSize && currentIndex < frameCount; i++) {
                        batchPromises.push(loadFrame(currentIndex));
                        currentIndex++;
                    }
                    await Promise.all(batchPromises);
                    
                    if (typeof requestIdleCallback === 'function') {
                        requestIdleCallback(() => loadNextBatch());
                    } else {
                        setTimeout(loadNextBatch, 50);
                    }
                };

                if (typeof requestIdleCallback === 'function') {
                    requestIdleCallback(() => loadNextBatch());
                } else {
                    setTimeout(loadNextBatch, 100);
                }
            };

            if (document.readyState === 'complete') {
                startRemainingLoad();
            } else {
                window.addEventListener('load', startRemainingLoad, { once: true });
            }
        };

        loadCritical();

        // 4. Create a single, clean GSAP Timeline for EVERYTHING
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%",
                scrub: true, // Let Lenis handle the smoothing instead of GSAP lagging behind
                pin: true,
            }
        });

        // Add the canvas sequence animation to the timeline
        tl.to(frames, {
            current: frameCount - 1,
            snap: "current",
            ease: "none",
            onUpdate: () => {
                const currentFrame = Math.round(frames.current);
                if (currentFrame !== lastRenderedFrame) {
                    renderFrame(currentFrame);
                    lastRenderedFrame = currentFrame;
                }
            }
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
                        style={{ willChange: 'transform, opacity' }}
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
