import LoginCard from "@repo/ui/login-card";
import styles from "./page.module.css";
import { cookies } from "next/headers";

import { FC, Suspense } from "react";

const Home: FC = async () => {
  const cookieStore = await cookies();
  const country = cookieStore.get("x-country")?.value || "unknown";
  console.log("Home country", country);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback="Loading...">
          <LoginCard country={country} />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
