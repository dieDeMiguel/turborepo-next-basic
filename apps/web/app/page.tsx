import LoginCard from "@repo/ui/login-card";
import styles from "./page.module.css";
import { cookies } from "next/headers";

import { FC } from "react";

const Home: FC = async () => {
  const cookieStore = await cookies();
  const country = cookieStore.get("x-country")?.value || "unknown";
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginCard country={country} />
      </main>
    </div>
  );
};

export default Home;
