import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './EditorialSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const EditorialSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
      gsap.fromTo(numberRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.divider} ref={lineRef}></div>

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <div className={styles.catalogNumber} ref={numberRef}>01</div>
          <div className={styles.metaStack}>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>Year</span>
              <span className={styles.metaVal}>1962 — 1987</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>Technique</span>
              <span className={styles.metaVal}>Silkscreen / Polymer</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>Location</span>
              <span className={styles.metaVal}>MoMA, New York</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaKey}>Category</span>
              <span className={styles.metaVal}>Pop Art</span>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn} ref={textRef}>
          <h2 className={styles.heading}>The Mechanical<br />Reproduction of<br /><em>Celebrity</em></h2>
          <p className={styles.body}>
            By embracing the aesthetic vocabulary of mass media and advertising, Warhol fundamentally dissolved the boundary between high art and commercial culture. The mechanical reproduction of imagery altered the relationship between artist, artwork, and consumer — making the copy as meaningful as the original.
          </p>
          <a href="#artworks" className={styles.cta}>
            <span>View Artworks</span>
            <span className={styles.ctaArrow}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
