import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const location = useLocation();

    // Reset hover state on route change
    useEffect(() => {
        const timer = setTimeout(() => setIsHovering(false), 0);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    useGSAP(() => {
        const cursor = cursorRef.current;
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

        const onMouseMove = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .clickable')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            const clickable = e.target.closest('a, button, .clickable');
            if (clickable) {
                // If leaving the clickable element entirely
                if (!e.relatedTarget || !clickable.contains(e.relatedTarget)) {
                    setIsHovering(false);
                }
            }
        };
        
        const handleClick = (e) => {
            // Re-evaluate hover state after click, in case DOM changed
            setTimeout(() => {
                const elUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
                if (elUnderCursor && elUnderCursor.closest('a, button, .clickable')) {
                    setIsHovering(true);
                } else {
                    setIsHovering(false);
                }
            }, 50);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('click', handleClick);
        
        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('click', handleClick);
        };
    }, { scope: cursorRef });

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
