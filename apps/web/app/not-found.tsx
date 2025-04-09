import React from 'react';
import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className="container">
      <div className={styles.notFound}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className={styles.backButton}>
          Go to Home Page
        </Link>
      </div>
    </main>
  );
} 