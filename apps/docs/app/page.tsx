import styles from "./page.module.css";
import RegisterCard from "@repo/ui/register-card";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <RegisterCard />
      </main>
    </div>
  );
}
