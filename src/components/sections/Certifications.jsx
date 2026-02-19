import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '../../data/certifications';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.cert-card');
        
        cards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 20,
                opacity: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
    }, { scope: containerRef });

    const displayedCerts = certifications.slice(0, 3);

    return (
        <section id="certifications" ref={containerRef} className="py-24 relative bg-gray-50 dark:bg-background-dark">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[80px]"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="w-full md:w-auto text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Key Certifications</h2>
                        <div className="h-1 w-20 bg-primary mt-4 rounded-full mx-auto md:mx-0"></div>
                    </div>
                    <Link 
                        to="/certifications" 
                        className="hidden md:inline-flex items-center text-primary hover:text-primary-dark font-medium group transition-colors"
                    >
                        See More
                        <span className="material-icons-round ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedCerts.map((cert, index) => (
                        <div 
                            key={index}
                            className="cert-card group bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                                    <span className="material-icons-round text-gray-500 dark:text-gray-400">{cert.icon}</span>
                                </div>
                                <span className={`px-2 py-1 ${cert.colorClass} text-xs font-semibold rounded`}>{cert.year}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.issuer}</p>
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{cert.level}</span>
                                <span className="material-icons-round text-gray-400 text-sm group-hover:text-primary">verified</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link 
                        to="/certifications" 
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium group transition-colors"
                    >
                        See More
                        <span className="material-icons-round ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
