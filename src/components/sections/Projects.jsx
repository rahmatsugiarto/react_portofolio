import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';
import ImageModal from '../ui/ImageModal';
import { useState } from 'react';

const Projects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                scrub: true,
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
                        <div key={index} className="w-screen h-screen flex flex-col md:flex-row justify-center items-center px-4 md:px-20 gap-8 md:gap-20 relative">
                            
                            <div className="w-full md:w-1/3 flex flex-col justify-center order-2 md:order-1">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((item, i) => (
                                        <span key={i} className="text-[10px] md:text-xs font-bold tracking-widest uppercase px-2 py-1 bg-gray-100 dark:bg-gray-800 text-primary rounded">
                                            {item}
                                        </span>
                                    ))}
                                    <span className="text-[10px] md:text-xs font-medium text-gray-500 dark:text-gray-400 ml-2 py-1">
                                        — {project.year}
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tighter leading-tight">{project.title}</h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-4">
                                    {project.github && (
                                        project.github.isPrivate ? (
                                            <span className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400 cursor-not-allowed">
                                                GitHub Private
                                            </span>
                                        ) : (
                                            <a href={project.github.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-gray-900 dark:border-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                                GitHub
                                            </a>
                                        )
                                    )}
                                    {project.playstore && (
                                        <a href={project.playstore} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all">
                                            Play Store
                                        </a>
                                    )}
                                    {project.appstore && (
                                        <a href={project.appstore} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-black dark:bg-white dark:text-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all">
                                            App Store
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div 
                                className="w-full md:w-1/2 h-[35vh] md:h-[55vh] relative order-1 md:order-2 group overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl cursor-zoom-in"
                                onClick={() => {
                                    setSelectedImage(project.image);
                                    setIsModalOpen(true);
                                }}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                                
                                {/* Hover Indicator */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                                    <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                        View Detail
                                    </span>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-10 left-10 md:left-20 text-9xl font-bold text-gray-300 dark:text-gray-700 opacity-20 pointer-events-none z-0">
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

            <ImageModal 
                isOpen={isModalOpen} 
                imageSrc={selectedImage} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
};

export default Projects;
