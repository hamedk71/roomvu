import styles from "./page.module.scss";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={`${styles.main} container`}>
       <h1>Hello World</h1>
      </main>
    </div>
  );
}
