import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Marquee.module.css';

interface MarqueeProps {
  items: string[];
  speed?: number;
  inverted?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 1, inverted = false }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2; // We duplicate, so half is one set
    const duration = totalWidth / (80 * speed);
    const dir = inverted ? '+=' : '-=';

    const anim = gsap.to(track, {
      x: `${dir}${totalWidth}`,
      duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
      }
    });

    // Pause on hover
    track.parentElement?.addEventListener('mouseenter', () => anim.timeScale(0.2));
    track.parentElement?.addEventListener('mouseleave', () => anim.timeScale(1));

    return () => anim.kill();
  }, [speed, inverted]);

  const displayItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div className={`${styles.wrapper} ${inverted ? styles.wrapperInverted : ''}`}>
      <div className={styles.track} ref={trackRef}>
        {displayItems.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot} aria-hidden>•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
