import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';
import Magnetic from '../components/ui/Magnetic';
import ImageModal from '../components/ui/ImageModal';
import { useState } from 'react';

const ProjectsPage = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.page-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });

        tl.from('.back-btn', {
            y: 20,
            opacity: 0,
            duration: 0.8,
        }, '-=0.6');

        tl.from('.project-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        }, '-=0.5');

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen bg-background-light dark:bg-background-dark py-20 px-6 md:px-12">
            
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h1 className="page-title text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 tracking-tighter mb-4">
                        Projects
                    </h1>
                    <p className="page-title text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                        Here are some of my projects that I have worked on.
                    </p>
                </div>

                <div className="back-btn">
                    <Magnetic>
                        <button 
                            onClick={() => {
                                if (window.history.state && window.history.state.idx > 0) {
                                    navigate(-1);
                                } else {
                                    navigate('/');
                                }
                            }}
                            className="px-8 py-3 border border-gray-900 dark:border-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                            Back Home
                        </button>
                    </Magnetic>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {projects.map((project, index) => (
                    <div key={index} className="project-card group">
                        <div 
                            className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-gray-100 dark:bg-gray-800 shadow-xl cursor-zoom-in"
                            onClick={() => {
                                setSelectedImage(project.image);
                                setIsModalOpen(true);
                            }}
                        >
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                            
                            {/* Hover Indicator */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                                <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    View Detail
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tech.map((item, i) => (
                                        <span key={i} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-primary/10 text-primary rounded">
                                            {item}
                                        </span>
                                    ))}
                                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 ml-1 py-1">
                                        — {project.year}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6 text-sm leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mt-auto">
                                {project.github && (
                                    project.github.isPrivate ? (
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-full cursor-not-allowed">
                                            Private
                                        </span>
                                    ) : (
                                        <a href={project.github.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-gray-900 dark:border-white rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                            GitHub
                                        </a>
                                    )
                                )}
                                {project.playstore && (
                                    <a href={project.playstore} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary text-white rounded-full hover:opacity-90 transition-all">
                                        Play Store
                                    </a>
                                )}
                                {project.appstore && (
                                    <a href={project.appstore} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-black dark:bg-white dark:text-black text-white rounded-full hover:opacity-90 transition-all">
                                        App Store
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer space */}
            <div className="h-20"></div>

            <ImageModal 
                isOpen={isModalOpen} 
                imageSrc={selectedImage} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default ProjectsPage;
