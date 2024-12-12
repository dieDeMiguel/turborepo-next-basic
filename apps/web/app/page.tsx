import styles from "./page.module.css";
import { cookies } from "next/headers";
import { FC, Suspense } from "react";
import RegisterCard from "@repo/ui/register-card";

const Home: FC = async () => {
  const cookieStore = await cookies();
  const country = cookieStore.get("x-country")?.value || "unknown";
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback="Loading...">
          <RegisterCard country={country} />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
