import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    let lenis: Lenis;
    try {
      lenis = new Lenis();

      const onScroll = () => ScrollTrigger.update();
      lenis.on('scroll', onScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.off('scroll', onScroll);
        lenis.destroy();
        gsap.ticker.remove(tick);
      };
    } catch (e) {
      console.warn('Lenis init failed, falling back to native scroll', e);
    }
  }, []);
};
