import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useGSAP(() => {
        const cursor = cursorRef.current;
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

        const onMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', onMouseMove);
        
        // Add listeners to clickable elements
        const clickables = document.querySelectorAll('a, button, .clickable');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, { scope: cursorRef }); // Scope might not be ideal here since listeners are global, but safe

    // Effect to handle hover state animation
    useGSAP(() => {
        if (isHovering) {
            gsap.to(cursorRef.current, { scale: 3, duration: 0.3 });
        } else {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        }
    }, [isHovering]);

    return (
        <div 
            ref={cursorRef} 
            className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block" // Hidden on mobile
        ></div>
    );
};

export default Cursor;
