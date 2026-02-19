import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';
import Magnetic from '../components/ui/Magnetic';

const ProjectsPage = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.page-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2
        });

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
                        Selected Works
                    </h1>
                    <p className="page-title text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                        A collection of projects covering security, enterprise solutions, and more.
                    </p>
                </div>

                <Magnetic>
                    <button 
                        onClick={() => navigate('/')}
                        className="page-title px-8 py-3 border border-gray-900 dark:border-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                        Back Home
                    </button>
                </Magnetic>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {projects.map((project, index) => (
                    <div key={index} className="project-card group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                        
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-primary font-bold tracking-widest text-xs mb-2 block">
                                    {project.category} — {project.year}
                                </span>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight group-hover:underline decoration-2 underline-offset-4">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                                    {project.description}
                                </p>
                            </div>
                            
                            <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                <span className="material-icons-round text-sm transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                    arrow_forward
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer space */}
            <div className="h-20"></div>
        </div>
    );
};

export default ProjectsPage;
