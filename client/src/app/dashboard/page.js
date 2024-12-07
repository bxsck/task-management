"use client";

import TodoBoard from "@/components/todos/todoBoard";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
// import ScrollToTop from "@/components/common/ScrollToTop";

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>DASHBOARD</h1>
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <TodoBoard />
      {/* // TODO: THE SCROLL TO TOP IS NOT WORKING PROPERLY, FIX SOON */}
      {/* <ScrollToTop /> */}
    </div>
  );
}
