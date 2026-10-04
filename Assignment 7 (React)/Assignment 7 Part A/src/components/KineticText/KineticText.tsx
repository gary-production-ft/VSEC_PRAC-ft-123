import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './KineticText.module.css';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  color?: string;
  outlined?: boolean;
}

const KineticText: React.FC<KineticTextProps> = ({
  text, speed = 1, direction = 'left', color, outlined = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const xEnd = direction === 'left' ? -300 * speed : 300 * speed;
      gsap.fromTo(textRef.current,
        { x: direction === 'left' ? 200 * speed : -200 * speed },
        {
          x: xEnd,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div className={styles.container} ref={containerRef}>
      <h2
        ref={textRef}
        className={styles.text}
        style={{
          color: outlined ? 'transparent' : (color || '#f0f0f0'),
          WebkitTextStroke: outlined ? `2px ${color || 'rgba(240,240,240,0.5)'}` : undefined,
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default KineticText;
