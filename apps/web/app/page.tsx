import LoginCard from "@repo/ui/login-card";
import styles from "./page.module.css";

import { FC } from "react";

const Home: FC = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginCard />
      </main>
    </div>
  );
};

export default Home;
