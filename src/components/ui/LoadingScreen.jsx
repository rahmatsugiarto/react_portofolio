import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

// Must match index.html pre-loader exactly
const LOGO_SIZE = 80;
const LOGO_RADIUS = 22;
const LOGO_FONT_SIZE = 44;

const LoadingScreen = ({ onLoadingComplete }) => {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const progressContainerRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressTextRef = useRef(null);
    const hasFinishedRef = useRef(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Logo is already visible from pre-loader, so NO entrance animation on the logo.
        // Just animate in the progress bar + text below it after a tiny delay.
        const tl = gsap.timeline({ delay: 0.15 });

        tl.fromTo(progressContainerRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        tl.fromTo(progressTextRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            "-=0.2"
        );

        // Subtle continuous pulse glow on the logo
        gsap.to(logoRef.current, {
            boxShadow: '0 0 50px rgba(37, 99, 235, 0.25)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        return () => {
            tl.kill();
        };
    }, []);

    const finishLoading = useCallback(() => {
        if (hasFinishedRef.current) return;
        hasFinishedRef.current = true;

        const exitTl = gsap.timeline({
            onComplete: () => {
                onLoadingComplete?.();
            }
        });

        // Fade out progress bar + text first
        exitTl.to(progressContainerRef.current, {
            opacity: 0, y: -8, duration: 0.3, ease: "power2.in"
        });

        exitTl.to(progressTextRef.current, {
            opacity: 0, duration: 0.2
        }, "<");

        // Scale up and fade logo
        exitTl.to(logoRef.current, {
            scale: 1.15, opacity: 0, duration: 0.5, ease: "power2.in"
        }, "-=0.1");

        // Slide the whole screen up
        exitTl.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            delay: 0.1
        });
    }, [onLoadingComplete]);

    useEffect(() => {
        const criticalFrameCount = 10;
        const totalAssets = criticalFrameCount + 1;
        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalAssets) * 100);
            setProgress(newProgress);

            if (progressBarRef.current) {
                gsap.to(progressBarRef.current, {
                    width: `${newProgress}%`,
                    duration: 0.3,
                    ease: "power1.out"
                });
            }

            if (loadedCount >= totalAssets) {
                finishLoading();
            }
        };

        for (let i = 1; i <= criticalFrameCount; i++) {
            const img = new Image();
            const paddedIndex = String(i).padStart(4, '0');
            img.src = `/sequence/frame_${paddedIndex}.jpg`;

            if (img.complete) {
                updateProgress();
            } else {
                img.onload = updateProgress;
                img.onerror = updateProgress;
            }
        }

        if (document.readyState === 'complete') {
            updateProgress();
        } else {
            window.addEventListener('load', updateProgress, { once: true });
        }

        const safetyTimeout = setTimeout(() => {
            if (loadedCount < totalAssets) {
                loadedCount = totalAssets;
                setProgress(100);
                if (progressBarRef.current) {
                    gsap.to(progressBarRef.current, { width: '100%', duration: 0.3 });
                }
                finishLoading();
            }
        }, 8000);

        return () => {
            clearTimeout(safetyTimeout);
        };
    }, [finishLoading]);

    return (
        <div
            ref={containerRef}
            className="loading-screen"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
            }}
        >
            {/* Animated Background */}
            <div className="loading-screen__bg" />

            {/* Floating particles */}
            <div className="loading-screen__particles">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="loading-screen__particle" style={{
                        '--delay': `${i * 0.8}s`,
                        '--x': `${15 + Math.random() * 70}%`,
                        '--size': `${3 + Math.random() * 5}px`,
                    }} />
                ))}
            </div>

            {/* Logo — absolutely centered, same size as pre-loader */}
            <div
                ref={logoRef}
                className="loading-screen__logo"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${LOGO_SIZE}px`,
                    height: `${LOGO_SIZE}px`,
                    borderRadius: `${LOGO_RADIUS}px`,
                }}
            >
                <span className="loading-screen__logo-text" style={{ fontSize: `${LOGO_FONT_SIZE}px` }}>R</span>
            </div>

            {/* Progress bar + text — positioned below the logo center */}
            <div
                ref={progressContainerRef}
                className="loading-screen__progress-container"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    marginTop: `${LOGO_SIZE / 2 + 28}px`,
                    opacity: 0,
                }}
            >
                <div className="loading-screen__progress-track">
                    <div
                        ref={progressBarRef}
                        className="loading-screen__progress-bar"
                        style={{ width: '0%' }}
                    />
                </div>
            </div>

            <p
                ref={progressTextRef}
                className="loading-screen__text"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    marginTop: `${LOGO_SIZE / 2 + 48}px`,
                    opacity: 0,
                }}
            >
                {progress < 100 ? 'Loading experience...' : 'Ready'}
            </p>
        </div>
    );
};

export default LoadingScreen;
