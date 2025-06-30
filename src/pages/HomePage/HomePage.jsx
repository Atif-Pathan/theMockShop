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
      <div
        data-testid="mouse-glow"
        className={styles.mouseGlow}
        ref={mouseGlowRef}
      ></div>

      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          Your Essential Style, <br />
          <span className={styles.headlineAccent}>Carefully Chosen.</span>
        </h1>

        <p className={styles.subheadline}>
          Welcome to <span className={styles.brandHighlight}>The Edit</span> –
          where quality, consciousness, and timeless design converge. We present
          a handpicked collection of essentials for your wardrobe and home,
          curated for a more intentional lifestyle.
        </p>

        <div className={styles.ctaSection}>
          <Link to="/shop" className={styles.ctaButtonWrapper}>
            <button className={styles.ctaButton}>
              <span>Explore The Collection</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </Link>
          <p className={styles.ctaSubtext}>Discover pieces that matter.</p>
        </div>
      </div>
    </main>
  );
}
