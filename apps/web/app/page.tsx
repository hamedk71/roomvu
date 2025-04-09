import { TestComponent } from "@repo/ui";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Typography System</h1>
        
        <p>This page demonstrates our professional typography system with multiple font families and consistent styling.</p>
        
        <h2>Heading Level 2</h2>
        <p>Using our <span className={styles.highlight}>primary font</span> for headings with carefully calibrated sizes and weights.</p>
        
        <h3>Heading Level 3</h3>
        <p>Typography is set with proper line heights, letter spacing, and font weights.</p>
        
        <h4>Heading Level 4</h4>
        <p>We have access to different font families: primary, secondary, and monospace.</p>
        
        <h5>Heading Level 5</h5>
        <p>All text uses <code>rem</code> units for proper scaling based on user preferences.</p>
        
        <h6>Heading Level 6</h6>
        <p>Our design system includes robust typography mixins for consistent styling across components.</p>

        <TestComponent />
      </main>
    </div>
  );
}
