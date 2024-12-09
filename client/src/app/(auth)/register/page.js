"use client";

import Link from "next/link";
import styles from "./register.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/apis";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (credentials) => signupUser(credentials),
    onSuccess: () => {
      alert("Registration successful! Please login to continue.");
      router.push("/login");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Registration failed");
    },
  });

  const validatePasswords = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Password does not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const display_name = e.target.elements.displayName.value;

    if (!validatePasswords()) {
      return;
    }

    mutation.mutate({ username, password, display_name });
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
          <h1>Sign Up</h1>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className={`${styles.input} ${styles.inputTextVisible}`}
              required
            />
            <input
              name="displayName"
              type="text"
              placeholder="Display Name"
              className={`${styles.input} ${styles.inputTextVisible}`}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password (min. 6 characters)"
              className={`${styles.input} ${styles.inputTextVisible}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length >= 6) {
                  validatePasswords();
                }
              }}
              onBlur={validatePasswords}
              required
              minLength={6}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className={`${styles.input} ${styles.inputTextVisible}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validatePasswords();
              }}
              required
            />
            {passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
            <button type="submit" className={styles.ctaButton}>
              Register
            </button>
            <p className={styles.loginLink}>
              Already have an account? <Link href="/login">Login here</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
