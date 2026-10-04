import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Navigation.module.css';

const NAV_LINKS = ['Exhibition', 'Artworks', 'Culture', 'Archive', 'About'];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power4.inOut' }
      );
      gsap.fromTo(itemRefs.current,
        { y: 80, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.35 }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(overlayRef.current, { display: 'none' })
      });
    }
  }, [isOpen]);

  // Magnetic hover
  const handleItemMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, i: number) => {
    const el = itemRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
    gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
  };
  const handleItemMouseLeave = (i: number) => {
    gsap.to(itemRefs.current[i], { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <span className={styles.brandName}>WARHOL</span>
          <span className={styles.brandSub}>ARTS</span>
        </div>
        <button
          className={`${styles.menuBtn} ${isOpen ? styles.menuBtnOpen : ''}`}
          onClick={() => setIsOpen(v => !v)}
          aria-label="Toggle Menu"
        >
          <span className={styles.burger}><span /><span /></span>
          <span className={styles.menuLabel}>{isOpen ? 'Close' : 'Menu'}</span>
        </button>
      </nav>

      <div className={styles.overlay} ref={overlayRef} style={{ display: 'none' }}>
        <div className={styles.overlayContent}>
          <div className={styles.overlayMeta}>
            <span>Navigation</span>
            <span>01 / 2026</span>
          </div>
          <nav className={styles.menuNav}>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                ref={el => { itemRefs.current[i] = el; }}
                className={styles.menuLink}
                onClick={() => setIsOpen(false)}
                onMouseMove={e => handleItemMouseMove(e, i)}
                onMouseLeave={() => handleItemMouseLeave(i)}
              >
                <span className={styles.linkNum}>0{i + 1}</span>
                <span className={styles.linkText}>{link}</span>
                <span className={styles.linkArrow}>↗</span>
              </a>
            ))}
          </nav>
          <div className={styles.overlayFooter}>
            <span>New York, 2026</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
