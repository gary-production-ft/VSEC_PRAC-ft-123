import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    const move = (e: MouseEvent) => {
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.5, borderColor: 'var(--color-accent-red)', duration: 0.3 });
      gsap.to(dot, { scale: 0.3, duration: 0.3 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 0.6, borderColor: 'rgba(240,240,240,0.5)', duration: 0.4 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };
    const onEnterImg = () => {
      gsap.to(ring, { scale: 3.5, opacity: 0.3, borderColor: '#f0f0f0', duration: 0.4 });
    };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });
    document.querySelectorAll('img').forEach(el => {
      el.addEventListener('mouseenter', onEnterImg);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div className={styles.dot} ref={dotRef} />
      <div className={styles.ring} ref={ringRef} />
    </>
  );
};

export default CustomCursor;
