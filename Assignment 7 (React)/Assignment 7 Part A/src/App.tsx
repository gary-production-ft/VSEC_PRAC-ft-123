import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import Preloader from './components/Preloader/Preloader';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Navigation from './components/Navigation/Navigation';
import WebGLBackground from './components/WebGLBackground/WebGLBackground';
import HeroSection from './sections/HeroSection';
import EditorialSection from './sections/EditorialSection';
import HorizontalGallery from './sections/HorizontalGallery';
import Marquee from './components/Marquee/Marquee';
import KineticText from './components/KineticText/KineticText';
import FooterSection from './sections/FooterSection';

function App() {
  useLenis();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <WebGLBackground />
      <div className="noise-overlay" />
      <CustomCursor />
      <Navigation />
      <Preloader onComplete={() => setLoading(false)} />
      <main style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <HeroSection />
        <EditorialSection />
        <KineticText text="ICON — POP —" speed={1.2} direction="left" />
        <KineticText text="CULTURE" speed={1.5} direction="right" outlined />
        <HorizontalGallery />
        <Marquee items={['Pop Art', 'Mass Media', 'Culture', 'Icon', 'New York', 'Warhol']} speed={1} />
        <KineticText text="1962 — FOREVER —" speed={1} direction="left" color="rgba(204,34,0,0.6)" />
        <Marquee items={['Exhibition', 'Archive', 'Silkscreen', 'Polymer', 'Canvas', 'Portrait']} speed={0.7} inverted />
        <FooterSection />
      </main>
    </>
  );
}

export default App;
