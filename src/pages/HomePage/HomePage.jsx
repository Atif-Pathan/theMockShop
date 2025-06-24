import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
  const mouseGlowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.left = e.clientX + 'px';
        mouseGlowRef.current.style.top = e.clientY + 'px';
        mouseGlowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.opacity = '0';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main className={styles.hero}>
      <div className={styles.mouseGlow} ref={mouseGlowRef}></div>

      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          Conscious Style,
          <span className={styles.headlineAccent}> Effortlessly Delivered</span>
        </h1>

        <p className={styles.subheadline}>
          Welcome to <span className={styles.brandHighlight}>The Wardrobe</span>
          , a destination for those who seek more than just clothes. We offer a
          thoughtfully selected range of high-quality, timeless essentials
          designed to build a versatile and intentional wardrobe.
        </p>

        <div className={styles.ctaSection}>
          <Link to="/shop" className={styles.ctaButtonWrapper}>
            <button className={styles.ctaButton}>
              <span>Explore The Collection</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </Link>

          <p className={styles.ctaSubtext}>
            Shop with purpose, wear with confidence
          </p>
        </div>
      </div>
    </main>
  );
}
