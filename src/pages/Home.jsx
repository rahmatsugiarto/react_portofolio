import React, { useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from '../components/sections/About';
import Magnetic from '../components/ui/Magnetic';
import ScrollSequence from '../components/ui/ScrollSequence';

const Experience = lazy(() => import('../components/sections/Experience'));
const Education = lazy(() => import('../components/sections/Education'));
const Certifications = lazy(() => import('../components/sections/Certifications'));
const Projects = lazy(() => import('../components/sections/Projects'));
const Skills = lazy(() => import('../components/sections/Skills'));

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // Initial scroll trigger for parallax or fade out of the container if needed
            // Since ScrollSequence now handles the internal content, we only need to fade the whole container if desired.
            gsap.to('.hero-container', {
                scrollTrigger: {
                    trigger: '.hero-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                yPercent: 50,
                opacity: 0
            });
        });

    }, { scope: heroRef });

    // Helper to split text for animation
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="inline-block overflow-hidden">
                <span className="hero-char inline-block transform">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));
    };

    const homeSequences = [
        {
            start: 0,
            end: 20,
            className: "flex flex-col justify-center px-6 md:px-12 w-full h-screen z-10",
            content: (
                <div className="max-w-7xl mx-auto w-full">
                    <div className="mb-2 overflow-hidden">
                        <span className="hero-subtitle inline-block text-sm md:text-base font-medium text-primary dark:text-blue-300 tracking-widest uppercase mb-4 transition-colors duration-500">
                            Mobile Developer
                        </span>
                    </div>

                    <h1 className="text-[14vw] md:text-[11vw] leading-[0.85] font-bold tracking-tighter text-gray-900 dark:text-white mb-8 whitespace-nowrap transition-colors duration-500">
                        <div className="overflow-hidden">
                            {splitText("RAHMAT")}
                        </div>
                        <div className="overflow-hidden text-gray-400 dark:text-gray-300">
                            {splitText("SUGIARTO")}
                        </div>
                    </h1>

                    <div className="hero-subtitle max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-200 leading-relaxed text-balance transition-colors duration-500">
                        Crafting intuitive mobile experiences with Flutter. Based in Indonesia.
                    </div>

                    <div className="mt-12 flex gap-6 z-30 pointer-events-auto">
                        {[
                            { icon: 'email', href: 'mailto:sugiartorahmat187@gmail.com', label: 'Email' },
                            { icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>, href: 'https://www.linkedin.com/in/rahmat-sugiarto/', label: 'LinkedIn' },
                            { icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>, href: 'https://github.com/rahmatsugiarto', label: 'GitHub' }
                        ].map((social, index) => (
                            <Magnetic key={index}>
                                <a 
                                    href={social.href} 
                                    target={social.label !== 'Email' ? "_blank" : undefined}
                                    rel={social.label !== 'Email' ? "noopener noreferrer" : undefined}
                                    className="hero-social w-14 h-14 flex items-center justify-center rounded-full border border-gray-900 text-gray-900 dark:border-white dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
                                    aria-label={social.label}
                                >
                                    {typeof social.icon === 'string' ? <span className="material-icons-round">{social.icon}</span> : social.icon}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>
            )
        },
        { 
            start: 30, 
            end: 100, 
            className: "flex flex-col justify-center px-6 md:px-12 w-full h-screen z-10",
            content: <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter text-left max-w-4xl transition-colors duration-500">Turning Ideas Into Reality.</h2> 
        },
        { 
            start: 105, 
            end: 240, 
            persist: true, 
            className: "flex flex-col justify-center px-6 md:px-12 w-full h-screen z-10",
            content: <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter text-left max-w-4xl transition-colors duration-500">Let's Create Something Amazing.</h2> 
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen">
            {/* Hero Section */}
            <div ref={heroRef} className="relative">
                <ScrollSequence 
                    folderPath="/sequence"
                    frameCount={240}
                    imagePrefix="frame_"
                    imageSuffix=".jpg"
                    padZeros={4}
                    sequences={homeSequences}
                />
            </div>

            <About />
            <Suspense fallback={<div className="h-20 w-full flex items-center justify-center">Loading section...</div>}>
                <Projects />
                <Skills />
                <Experience />
                <Education />
                <Certifications />
            </Suspense>
        </div>
    );
};

export default Home;
