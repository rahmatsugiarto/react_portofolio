import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Magnetic from './ui/Magnetic';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMenuRendered, setIsMenuRendered] = useState(false);
    const menuRef = useRef(null);
    
    // Theme state
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') !== 'light';
        }
        return true;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDark(prev => {
            const newTheme = !prev;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    const handleMenuToggle = () => {
        if (!isOpen) {
            setIsMenuRendered(true);
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const scrollToSection = (id) => {
        setIsOpen(false);
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    };

    useGSAP(() => {
        if (isMenuRendered && menuRef.current) {
            if (isOpen) {
                gsap.fromTo(menuRef.current, 
                    { height: 0, opacity: 0 },
                    { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
                );
            } else {
                gsap.to(menuRef.current, {
                    height: 0, 
                    opacity: 0, 
                    duration: 0.3, 
                    ease: 'power3.in',
                    onComplete: () => setIsMenuRendered(false)
                });
            }
        }
    }, [isOpen, isMenuRendered]);

    const navItems = [
        { name: 'About', id: 'about' },
        { name: 'Projects', id: 'projects' },
        { name: 'Experience', id: 'experience' },
    ];

    return (
        <nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'} mix-blend-difference text-white`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className={`flex items-center justify-between p-2 rounded-full transition-all duration-300 ${scrolled ? 'bg-white/10 backdrop-blur-md border border-white/10 px-6' : ''}`}>
                    
                    {/* Logo */}
                    <Magnetic>
                        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                <span className="text-lg font-bold tracking-tighter">RAHMAT</span>
                            </div>
                        </div>
                    </Magnetic>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Magnetic key={item.name}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-sm font-medium hover:text-gray-300 transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            </Magnetic>
                        ))}
                        
                        <div className="w-px h-4 bg-white/20"></div>

                        <Magnetic>
                            <button onClick={toggleTheme} className="p-2 hover:text-gray-300 transition-colors">
                                <span className="material-icons-round text-lg">
                                    {isDark ? 'light_mode' : 'dark_mode'}
                                </span>
                            </button>
                        </Magnetic>

                        <Magnetic>
                            <button 
                                onClick={() => scrollToSection('contact')} 
                                className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                            >
                                Let's Talk
                            </button>
                        </Magnetic>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={handleMenuToggle} className="p-2">
                             <span className="material-icons-round text-2xl">{isOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuRendered && (
                <div
                    ref={menuRef}
                    className="md:hidden overflow-hidden bg-black text-white px-6"
                >
                    <div className="flex flex-col space-y-6 py-10">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.id)}
                                className="text-4xl font-bold tracking-tighter text-left hover:text-gray-400 transition-colors"
                            >
                                {item.name}
                            </button>
                        ))}
                         <button
                            onClick={() => scrollToSection('contact')}
                            className="text-4xl font-bold tracking-tighter text-left text-primary"
                        >
                            Let's Talk
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
