import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FooterSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const FooterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
      lines.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)',
            duration: 1.2, delay: i * 0.1, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className={styles.footer} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.bigText}>
          <div className={styles.overflowGuard}><div ref={line1Ref} className={styles.line}>POP</div></div>
          <div className={styles.overflowGuard}><div ref={line2Ref} className={`${styles.line} ${styles.lineOutline}`}>ART</div></div>
          <div className={styles.overflowGuard}><div ref={line3Ref} className={styles.line}>FOREVER</div></div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <span>Warhol Arts</span>
            <span>New York / 2026</span>
          </div>
          <nav className={styles.bottomLinks}>
            {['Exhibition', 'Artworks', 'Culture', 'About'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
            ))}
          </nav>
          <span className={styles.copyright}>© 2026 All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
