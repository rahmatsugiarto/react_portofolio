import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useGSAP(() => {
        const pin = gsap.fromTo(sectionRef.current, {
            translateX: 0
        }, {
            translateX: "-200vw",
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "2000 top",
                scrub: 0.6,
                pin: true,
            }
        });

        return () => {
            pin.kill();
        };

    }, { scope: triggerRef });

    const projects = [
        {
            title: 'DigiSign',
            category: 'SECURITY',
            description: 'Biometric e-signature solution.',
            year: '2024',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxsFFttNMdsmC-v_SCkUuEjXwuPORnO9k1kwK38a4FeUFlKfwf0wN-xJXX73u3rwPdARE0RbLNQYtYXFU-wFfIrk9Fp5RX0M9UmnhfX8GHTbXh574jMj-GX2Nthr43iQe7j3qHbCDXmLz7bIOGXyY52ecy4z1Ge7fMgyZxmfBqLPWL8GNGp6-lYXmmwqNihuO0UMXS4QNdxPgKqz_fGpxxFBtDZYyNwD5uv8Py0bVvxFoB8Bq3FhP3TejzgnTAQwld55cJ_bztV2s',
        },
        {
            title: 'Rapim Telkom',
            category: 'ENTERPRISE',
            description: 'Executive meeting management.',
            year: '2023',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsGxsPMCTk9Vrx61PbVMxHgkeeRCKyfGrzMwtpnvdLb8N6GeiIn6xMi_XZ-fS7PHCUJwPlM_GGAagiDnCocgROSfemPPB6WOWN0v2VC_U768U3P4m3GymJb0d9-AD1eDZ3NcIb5WvYH7Th_zbjLY4t4ouNC9VSz1u5PBMstbNhg7N_H7r_2il5FAEnKM3Hz-Gl_pwsJoU__9Okyt9M8KDAX6bUYWV0IAKjGConuu6ZlKQPwHLtPRdnr03cv4Fv9lBpr0V9Tm1gXrM',
        },
        {
            title: 'E-Materai',
            category: 'GOVTECH',
            description: 'Digital stamp integration.',
            year: '2022',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGN7y-eUiL1BKqvUVB9BNi2jMuKuj6aqGAzg68y88ZUmZWuGTaSbZarjYyaL-R_p4rQlb_LkcM6UVDz2PcGrZH-L5-nF4SjTSTAxguHNs7HFbck5jaCd9VfFM68DWoF0zEyvCYbrgPUY8J8HwYYzqELq_FyG5UJKA8TjGGoq0vR9HGEbF8UNLO_8-x43S65_PoZdGJd0xPn-Qpd-1od1FUz-i7hqpxVUIKQ3aUp47PMdhLyw4umSegk461sZ796QPBVBWdiZjms3E',
        }
    ];

    return (
        <section id="projects" className="overflow-hidden bg-background-light dark:bg-background-dark">
            <div ref={triggerRef}>
                <div ref={sectionRef} className="h-screen w-[300vw] flex flex-row relative">
                    
                    {projects.map((project, index) => (
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

                </div>
            </div>
        </section>
    );
};

export default Projects;
