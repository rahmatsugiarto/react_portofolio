import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            
            const tl = gsap.timeline();
            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                display: 'flex'
            })
            .fromTo(contentRef.current, 
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
        } else {
            document.body.style.overflow = 'auto';
            if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        if (overlayRef.current) overlayRef.current.style.display = 'none';
                    }
                });
            }
        }
    }, [isOpen]);

    return (
        <div 
            ref={overlayRef}
            className="fixed inset-0 z-[9999] hidden flex-col justify-center items-center bg-black/90 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
            onClick={onClose}
        >
            <div className="absolute top-10 right-10 z-10">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors group"
                >
                    <span className="material-icons-round group-hover:rotate-90 transition-transform duration-300">close</span>
                </button>
            </div>

            <div 
                ref={contentRef}
                className="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none"
                style={{ opacity: 0 }}
            >
                <img 
                    src={imageSrc} 
                    alt="Project Detail" 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto cursor-default"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            
            <div className="mt-6 text-white/50 text-sm font-medium tracking-widest uppercase">
                Click anywhere to close
            </div>
        </div>
    );
};

export default ImageModal;
