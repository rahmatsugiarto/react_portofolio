import React from 'react';
import Magnetic from './ui/Magnetic';

const Footer = () => {
    return (
        <footer id="contact" className="bg-white dark:bg-black text-black dark:text-white py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                        LET'S WORK <br />
                        <span className="text-gray-400 dark:text-gray-600">TOGETHER</span>
                    </h2>
                    <Magnetic>
                         <a 
                            href="mailto:sugiartorahmat187@gmail.com"
                            className="bg-primary text-white w-32 h-32 rounded-full flex items-center justify-center font-bold text-sm tracking-widest hover:scale-110 transition-transform duration-300"
                        >
                            EMAIL ME
                        </a>
                    </Magnetic>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-8 gap-4">
                    <p className="text-sm text-gray-500 uppercase tracking-widest">
                        © {new Date().getFullYear()} Rahmat Sugiarto
                    </p>
                    <div className="flex gap-8">
                        <Magnetic>
                            <a href="https://www.linkedin.com/in/rahmat-sugiarto/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">LinkedIn</a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://github.com/rahmatsugiarto" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Github</a>
                        </Magnetic>
                        {/* <Magnetic>
                            <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Instagram</a>
                        </Magnetic> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
