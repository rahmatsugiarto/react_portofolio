import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const items = gsap.utils.toArray('.experience-row');
        
        items.forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    once: true
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }, { scope: containerRef });

    const experiences = [
        {
            role: 'Mobile Developer',
            company: 'TelkomSigma',
            period: 'June 2022 - Present',
            description: 'Develop and maintain high-quality mobile applications using Flutter (Android & iOS). Collaborate with cross-functional teams to deliver seamless user experiences and drive digital transformation initiatives.',
        },
        {
            role: 'Learning Facilitator',
            company: 'Dicoding Indonesia',
            period: 'January 2025 - March 2025',
            description: 'Facilitated the IDCamp Multi-Platform App (Flutter) Developer Intermediate 2024 program, guiding students through Flutter fundamentals, state management, and mobile application development best practices.',
        },
        {
            role: 'Android Development Mentor',
            company: 'UpSkill.id',
            period: 'March 2022 - June 2022',
            description: 'Create and deliver comprehensive Android development training programs for students. Provide hands-on guidance, code reviews, and technical support to help students master Kotlin and Android fundamentals.',
        }
    ];

    return (
        <section id="experience" ref={containerRef} className="py-32 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-6">
                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-16">Experience</span>
                
                <div className="flex flex-col border-t border-gray-200 dark:border-gray-800">
                    {experiences.map((exp, index) => (
                        <div key={index} className="experience-row grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/10 transition-colors duration-300">
                            <div className="md:col-span-3">
                                <span className="text-sm font-medium text-gray-400 dark:text-gray-500 tracking-wide font-mono">{exp.period}</span>
                            </div>
                            <div className="md:col-span-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{exp.role}</h3>
                                <p className="text-primary font-medium">{exp.company}</p>
                            </div>
                            <div className="md:col-span-5">
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
