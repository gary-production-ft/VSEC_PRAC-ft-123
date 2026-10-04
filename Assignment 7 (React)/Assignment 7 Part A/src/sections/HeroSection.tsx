import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Clip-path reveals from bottom
      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(100% 0 0 0)', y: 60 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out' }
      )
      .fromTo(line2Ref.current,
        { clipPath: 'inset(100% 0 0 0)', y: 60 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.9'
      )
      .fromTo(imgRef.current,
        { opacity: 0, scale: 1.15, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo([subRef.current, yearRef.current, scrollLineRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
        '-=0.6'
      );

      // Scroll parallax
      gsap.to(line1Ref.current, {
        yPercent: -60, xPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 }
      });
      gsap.to(line2Ref.current, {
        yPercent: -80, xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 }
      });
      gsap.to(imgRef.current, {
        yPercent: 25, scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      {/* Floating editorial metadata — top-left */}
      <div className={styles.topLeft}>
        <span className={styles.metaLabel}>Exhibition №1</span>
        <span className={styles.metaLabel}>Andy Warhol / 1962—1987</span>
      </div>

      {/* Top-right coordinates */}
      <div className={styles.topRight}>
        <span className={styles.metaLabel}>40°42′N 74°00′W</span>
        <span className={styles.metaLabel}>New York City</span>
      </div>

      {/* Floating image — center slightly right */}
      <div
        className={styles.heroImage}
        ref={imgRef}
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1541818290372-5bb9f214f447?auto=format&fit=crop&q=80&w=800"
          alt="Artwork"
        />
        <div className={styles.imageTag}>
          <span>01</span>
          <span>Marilyn Diptych</span>
        </div>
      </div>

      {/* Massive stacked title */}
      <div className={styles.titleStack}>
        <div className={styles.titleLine} ref={line1Ref}>
          <span className={styles.titleSolid}>MASS</span>
        </div>
        <div className={styles.titleLine} ref={line2Ref}>
          <span className={styles.titleOutline}>POP</span>
          <span className={styles.titleSmall} ref={subRef}>ART</span>
        </div>
      </div>

      {/* Year stamp */}
      <div className={styles.yearBlock} ref={yearRef}
        style={{ transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)` }}
      >
        <span>1962</span>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} ref={scrollLineRef}>
        <div className={styles.scrollLine}></div>
        <span>scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
