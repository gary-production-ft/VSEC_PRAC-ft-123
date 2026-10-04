import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HorizontalGallery.module.css';
import { artworks } from '../data/artworks';

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 120),
        ease: 'none',
        scrollTrigger: {
          id: 'hscroll',
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle Y parallax on each image
      gsap.utils.toArray<HTMLElement>(`.${styles.imgInner}`).forEach((img) => {
        gsap.fromTo(img,
          { y: -30 },
          {
            y: 30,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: ScrollTrigger.getById('hscroll')!,
              trigger: img,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allItems = [...artworks, ...artworks];

  return (
    <section className={styles.section} ref={sectionRef} id="artworks">
      {/* Section label */}
      <div className={styles.sectionLabel} ref={labelRef}>
        <span>Exhibition</span>
        <span>— Scroll →</span>
      </div>

      <div className={styles.track} ref={trackRef}>
        {/* Large intro item */}
        <div className={styles.introItem}>
          <h2 className={styles.introTitle}>Selected<br />Works</h2>
          <p className={styles.introSub}>1962 — 1987<br />Andy Warhol</p>
        </div>

        {allItems.map((art, i) => (
          <div key={`${art.id}-${i}`} className={`${styles.item} ${i % 3 === 1 ? styles.itemTall : ''}`}>
            <div className={styles.imgWrapper}>
              <div className={styles.imgInner}>
                <img src={art.image} alt={art.title} loading="lazy" />
              </div>
              <div className={styles.imgOverlay}>
                <span className={styles.artNum}>0{(i % artworks.length) + 1}</span>
              </div>
            </div>
            <div className={styles.itemMeta}>
              <div className={styles.itemTitle}>{art.title}</div>
              <div className={styles.itemYear}>{art.year}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalGallery;
