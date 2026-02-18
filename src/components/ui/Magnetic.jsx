import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Magnetic = ({ children }) => {
    const magnetic = useRef(null);

    useGSAP(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

        const mouseEnter = (e) => {
           // optional: scale up slightly
        }

        const mouseLeave = (e) => {
            xTo(0);
            yTo(0);
        }

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width/2);
            const y = clientY - (top + height/2);
            xTo(x * 0.35); // Strength of attraction
            yTo(y * 0.35);
        }

        magnetic.current.addEventListener("mouseenter", mouseEnter)
        magnetic.current.addEventListener("mouseleave", mouseLeave)
        magnetic.current.addEventListener("mousemove", mouseMove)

        return () => {
            if (magnetic.current) {
                magnetic.current.removeEventListener("mouseenter", mouseEnter)
                magnetic.current.removeEventListener("mouseleave", mouseLeave)
                magnetic.current.removeEventListener("mousemove", mouseMove)
            }
        }
    }, { scope: magnetic });

    return (
        <div ref={magnetic} className="inline-block">
            {children}
        </div>
    );
};

export default Magnetic;
