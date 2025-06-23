import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={styles.hero}>
      <h1 className={styles.headline}>
        Conscious Style, Effortlessly Delivered.
      </h1>
      <p className={styles.subheadline}>
        Welcome to The Curated Wardrobe, a destination for those who seek more
        than just clothes. We offer a thoughtfully selected range of
        high-quality, timeless essentials designed to build a versatile and
        intentional wardrobe. Shop with purpose, wear with confidence.
      </p>
      <Link to="/shop">
        <button className={styles.ctaButton}>Explore The Collection</button>
      </Link>
    </main>
  );
}
