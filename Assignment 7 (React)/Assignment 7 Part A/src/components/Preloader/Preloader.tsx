import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onComplete: () => void;
}

const fragments = ['WARHOL', 'ARTS', '01', 'POP', 'NYC', '1962', 'ICON', 'MASS'];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [fragment, setFragment] = useState('WARHOL');

  useEffect(() => {
    let fragIdx = 0;
    const fragInterval = setInterval(() => {
      fragIdx = (fragIdx + 1) % fragments.length;
      setFragment(fragments[fragIdx]);
    }, 120);

    const obj = { val: 0 };
    const tl = gsap.timeline();

    tl.to(obj, {
      val: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => setCounter(Math.round(obj.val)),
    })
    .to({}, { duration: 0.1, onComplete: () => clearInterval(fragInterval) })
    .to(wordRef.current, { opacity: 0, duration: 0.2 })
    .to(containerRef.current, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete,
    });

    return () => {
      clearInterval(fragInterval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className={styles.preloader} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.wordFrag} ref={wordRef}>{fragment}</div>
        <div className={styles.counter} ref={counterRef}>
          {String(counter).padStart(3, '0')}
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${counter}%` }} ref={lineRef} />
        </div>
        <div className={styles.brand}>WARHOL ARTS — Exhibition 2026</div>
      </div>
    </div>
  );
};

export default Preloader;
