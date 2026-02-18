import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Skills = () => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeRef2 = useRef(null);

    useGSAP(() => {
        const duration = 50;

        // First row moves left (0 to -50%)
        gsap.fromTo(marqueeRef.current, {
            xPercent: 0
        }, {
            xPercent: -50,
            repeat: -1,
            duration: duration,
            ease: "linear"
        });

        // Second row moves right (-50% to 0)
        gsap.fromTo(marqueeRef2.current, {
            xPercent: -50
        }, {
            xPercent: 0,
            repeat: -1,
            duration: duration,
            ease: "linear"
        });

    }, { scope: containerRef });

    const row1 = ["Flutter", "Dart", "Kotlin", "Swift", "Java", "Firebase", "Android SDK"];
    const row2 = ["Git", "CI/CD", "Figma", "Clean Architecture", "BLoC", "MVVM", "REST API"];

    return (
        <section id="skills" ref={containerRef} className="py-24 bg-background-light dark:bg-background-dark overflow-hidden cursor-default">
             <div className="max-w-7xl mx-auto px-6 mb-12">
                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-2">Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tighter">My Tech Stack</h2>
            </div>
            
            <div className="flex flex-col gap-8">
                {/* Row 1 */}
                <div className="flex whitespace-nowrap overflow-hidden -rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div ref={marqueeRef} className="flex gap-8">
                        {[...row1, ...row1, ...row1, ...row1].map((skill, index) => (
                            <div key={index} className="text-6xl md:text-8xl font-bold text-transparent hover:text-gray-900 dark:hover:text-white transition-colors duration-300 stroke-text">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex whitespace-nowrap overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div ref={marqueeRef2} className="flex gap-8">
                         {[...row2, ...row2, ...row2, ...row2].map((skill, index) => (
                            <div key={index} className="text-6xl md:text-8xl font-bold text-gray-200 dark:text-gray-800 hover:text-primary transition-colors duration-300">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(156, 163, 175, 0.5);
                }
                :global(.dark) .stroke-text {
                    -webkit-text-stroke: 1px rgba(75, 85, 99, 0.5);
                }
            `}</style>
        </section>
    );
};

export default Skills;
