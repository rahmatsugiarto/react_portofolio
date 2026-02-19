import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';

const Projects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const navigate = useNavigate();

    useGSAP(() => {
        const pin = gsap.fromTo(sectionRef.current, {
            translateX: 0
        }, {
            translateX: "-300vw", // Increased to accommodate the "See More" slide
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "3000 top", // Increased scroll distance
                scrub: 0.6,
                pin: true,
            }
        });

        return () => {
            pin.kill();
        };

    }, { scope: triggerRef });

    const displayedProjects = projects.slice(0, 3);


    return (
        <section id="projects" className="overflow-hidden bg-background-light dark:bg-background-dark">
            <div ref={triggerRef}>
                <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">
                    
                    {displayedProjects.map((project, index) => (
                        <div key={index} className="w-screen h-screen flex flex-col md:flex-row justify-center items-center px-4 md:px-20 gap-8 md:gap-20">
                            
                            <div className="w-full md:w-1/3 flex flex-col justify-center order-2 md:order-1">
                                <span className="text-primary font-bold tracking-widest text-sm mb-4 block">{project.category} — {project.year}</span>
                                <h3 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tighter">{project.title}</h3>
                                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md">{project.description}</p>
                                <button className="mt-8 px-8 py-3 border border-gray-900 dark:border-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    View Project
                                </button>
                            </div>

                            <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative order-1 md:order-2 group overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            
                            <div className="absolute bottom-10 left-10 md:left-20 text-9xl font-bold text-gray-200 dark:text-gray-800 opacity-20 pointer-events-none z-0">
                                0{index + 1}
                            </div>
                        </div>
                    ))}

                    {/* See More Slide */}
                    <div className="w-screen h-screen flex flex-col justify-center items-center px-4 md:px-20 bg-gray-50 dark:bg-gray-900/50">
                        <div className="text-center">
                            <h3 className="text-5xl md:text-8xl font-bold text-gray-900 dark:text-gray-100 mb-8 tracking-tighter">
                                More Work
                            </h3>
                            <button 
                                onClick={() => navigate('/projects')}
                                className="px-12 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                See All Projects
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Projects;
