import { Button } from "@repo/ui";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button>Click me</Button>
      </main>
    </div>
  );
}
