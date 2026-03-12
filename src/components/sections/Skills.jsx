import React, { useRef } from 'react';
import { SiFlutter, SiDart, SiKotlin, SiFirebase, SiAndroid, SiGit, SiFigma, SiJavascript, SiCodemagic, SiGooglegemini, SiGooglemaps, SiAndroidstudio, SiXcode, SiIos } from 'react-icons/si';
import { FaJava, FaInfinity, FaCube, FaLayerGroup, FaServer, FaSitemap, FaRocket, FaBell } from 'react-icons/fa';
import { TbBrandVscode } from 'react-icons/tb';

const Skills = () => {
    const containerRef = useRef(null);

    const skillsRow1 = [
        { name: "Flutter", icon: SiFlutter, color: "group-hover:text-[#02569B]" },
        { name: "Dart", icon: SiDart, color: "group-hover:text-[#0175C2]" },
        { name: "Kotlin", icon: SiKotlin, color: "group-hover:text-[#7F52FF]" },
        { name: "Java", icon: FaJava, color: "group-hover:text-[#5382A1]" },
        { name: "Firebase", icon: SiFirebase, color: "group-hover:text-[#FFCA28]" },
        { name: "Android", icon: SiAndroid, color: "group-hover:text-[#3DDC84]" },
        { name: "JavaScript", icon: SiJavascript, color: "group-hover:text-[#F7DF1E]" },
        { name: "Antigravity", icon: FaRocket, color: "group-hover:text-[#3b82f6]" },
        { name: "Gemini", icon: SiGooglegemini, color: "group-hover:text-[#8E75B2]" },
        { name: "VS Code", icon: TbBrandVscode, color: "group-hover:text-[#007ACC]" },
        { name: "Android Studio", icon: SiAndroidstudio, color: "group-hover:text-[#3DDC84]" }
    ];

    const skillsRow2 = [
        { name: "Git", icon: SiGit, color: "group-hover:text-[#F05032]" },
        { name: "Figma", icon: SiFigma, color: "group-hover:text-[#F24E1E]" },
        { name: "Clean Architecture", icon: FaSitemap, color: "group-hover:text-[#10b981]" },
        { name: "BLoC", icon: FaCube, color: "group-hover:text-[#8b5cf6]" },
        { name: "MVVM", icon: FaLayerGroup, color: "group-hover:text-[#f59e0b]" },
        { name: "REST API", icon: FaServer, color: "group-hover:text-[#ec4899]" },
        { name: "CodeMagic", icon: SiCodemagic, color: "group-hover:text-[#F96914]" },
        { name: "OneSignal", icon: FaBell, color: "group-hover:text-[#E54B4D]" },
        { name: "Maps", icon: SiGooglemaps, color: "group-hover:text-[#4285F4]" },
        { name: "Xcode", icon: SiXcode, color: "group-hover:text-[#147EFB]" },
        { name: "iOS", icon: SiIos, color: "group-hover:text-[#000000] dark:group-hover:text-[#FFFFFF]" }
    ];

    // Create copies to ensure a seamless infinite loop length
    const duplicatedRow1 = [...skillsRow1, ...skillsRow1, ...skillsRow1, ...skillsRow1];
    const duplicatedRow2 = [...skillsRow2, ...skillsRow2, ...skillsRow2, ...skillsRow2];

    return (
        <section id="skills" ref={containerRef} className="py-24 bg-background-light dark:bg-background-dark overflow-hidden cursor-default w-full">
             <div className="max-w-7xl mx-auto px-6 mb-12">
                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-2">Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tighter">My Tech Stack</h2>
            </div>
            
            <div className="flex flex-col gap-6 relative w-full overflow-hidden">
                {/* Fade Out Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>

                {/* Row 1 - Left to Right */}
                <div className="relative flex overflow-hidden group/marquee w-[200%] md:w-[150%] xl:w-[125%] max-w-none py-4">
                    <div className="flex gap-6 animate-marquee-left group-hover/marquee:[animation-play-state:paused]">
                        {duplicatedRow1.map((skill, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-2"
                            >
                                <skill.icon className={`w-10 h-10 mb-3 text-gray-500 dark:text-gray-400 transition-colors duration-300 ${skill.color}`} />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="relative flex overflow-hidden group/marquee2 w-[200%] md:w-[150%] xl:w-[125%] max-w-none py-4">
                     {/* Note: Starts at negative offset so it appears instantly, then moves to 0 */}
                    <div className="flex gap-6 animate-marquee-right group-hover/marquee2:[animation-play-state:paused] -translate-x-[50%]">
                        {duplicatedRow2.map((skill, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-2"
                            >
                                <skill.icon className={`w-10 h-10 mb-3 text-gray-500 dark:text-gray-400 transition-colors duration-300 ${skill.color}`} />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes marqueeLeft {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
                .animate-marquee-left {
                    display: flex;
                    animation: marqueeLeft 40s linear infinite;
                    width: max-content;
                }
                .animate-marquee-right {
                    display: flex;
                    animation: marqueeRight 40s linear infinite;
                    width: max-content;
                }
            `}</style>
        </section>
    );
};

export default Skills;
