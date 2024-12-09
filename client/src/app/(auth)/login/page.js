"use client";

import Link from "next/link";
import styles from "./login.module.css";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { setAuthToken } from "@/lib/auth";
import { loginUser } from "@/lib/apis";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response) => {
      const { access_token, user } = response.data;
      setAuthToken(access_token);
      login(user.display_name);

      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    },
    onError: (error) => {
      alert(error.message || "Login failed");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/dashboard");
    }
  }, [mutation.isSuccess, router]);

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
        <div className={styles["main-content"]}>
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
            <button
              type="submit"
              className={styles.ctaButton}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p className={styles.signupLink}>
              Don&apos;t have an account?{" "}
              <Link href="/register">Sign up here</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
