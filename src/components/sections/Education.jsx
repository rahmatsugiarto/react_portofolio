import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.education-item', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section id="education" ref={containerRef} className="py-24 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-6">
                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-12">Education</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="education-item">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Asia Cyber University</h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">Bachelor's in Informatics</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">Present • 7th Semester</p>
                    </div>

                    <div className="education-item">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Binar Academy</h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">Android Engineering Bootcamp</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">Graduated • Top Graduate</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
