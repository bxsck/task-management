import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.backgroundDecoration}></div>

      <nav className={styles.navbar}>
        <div className={styles.navButtons}>
          <Link href="/login">
            <button className={styles.loginBtn}>Login</button>
          </Link>
          <Link href="/register">
            <button className={styles.signupBtn}>Get Started →</button>
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <span className={styles.badge}>✨ Your Personal Task Assistant</span>
          <h1>
            Organize Tasks with
            <br />
            Joy and Ease
          </h1>
          <p>Make task management fun and efficient.</p>
          <div className={styles.ctaGroup}>
            <button className={styles.ctaButton}>Start for Free</button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="/assets/images/illustrate_o.png"
            alt="Task Management Illustration"
            width={600}
            height={300}
            priority
          />
          <div className={styles.floatingCard}>
            <span>🎯</span>
            <p>Track your goals</p>
          </div>
          <div className={styles.floatingCard}>
            <span>📈</span>
            <p>Boost productivity</p>
          </div>
        </div>
      </main>
    </div>
  );
}
