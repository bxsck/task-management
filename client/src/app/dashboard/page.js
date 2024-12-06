"use client";

import { useState } from "react";
import TodoBoard from "@/components/todos/TodoBoard";
import CreateTodoModal from "@/components/todos/CreateTodoModal"; // Import CreateTodoModal
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css"; // Import CSS module

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <button
        className={styles.createTodoButton}
        onClick={() => setIsModalOpen(true)}
      >
        + Add new task
      </button>
      <TodoBoard />
      {isModalOpen && <CreateTodoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
  //   return <div>Welcome to the Dashboard, {user.token}!</div>;
}
