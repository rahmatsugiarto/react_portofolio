import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    return (
        <section id="about" ref={containerRef}>
            <div className="py-24 bg-background-light dark:bg-background-dark">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-6">About Me</span>
                    <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 leading-relaxed font-light text-balance">
                        I'm a passionate Mobile Developer dedicated to crafting <span className="text-primary font-semibold">intuitive</span> and <span className="text-primary font-semibold">high-performance</span> applications. With a focus on Flutter and Android Native, I bridge the gap between complex functionality and elegant design.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
