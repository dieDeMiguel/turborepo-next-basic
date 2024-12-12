import styles from "./page.module.css";
import LoginCard from "@repo/ui/login-card";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginCard />
      </main>
    </div>
  );
}
