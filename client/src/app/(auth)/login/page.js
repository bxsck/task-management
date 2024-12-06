"use client";

import Link from "next/link";
import styles from "./login.module.css"; // Update the import to use the new CSS module

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { setAuthToken } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: (credentials) => axiosInstance.post("/auth/login", credentials),
    onSuccess: ({ data: response }) => {
      setAuthToken(response.data.access_token);
      login(response.data.user.display_name);
      router.push("/dashboard");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    mutation.mutate({ username, password });
  };

  return (
    <div className={styles.page}>
      <div className={styles.backgroundDecoration}></div>

      <nav className={styles.navbar}>
        <div className={styles.navButtons}>
          <Link href="/">
            <button className={styles.homeBtn}>Home</button>
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Login</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className={`${styles.input} ${styles.inputTextVisible}`}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className={`${styles.input} ${styles.inputTextVisible}`}
            />
            <button type="submit" className={styles.ctaButton}>
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
