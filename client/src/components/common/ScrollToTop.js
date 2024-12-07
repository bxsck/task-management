"use client";
import { useState, useLayoutEffect, useCallback } from "react";
import styles from "./ScrollToTop.module.css";

/* // !THIS COMPONENT DOES NOT WORKING PROPERLY */
const ScrollToTop = () => {
  const [isShowScrollUp, setIsShowScrollUp] = useState(false);

  const handleScroll = useCallback(() => {
    setIsShowScrollUp(document.documentElement.scrollTop > 400);
  }, []);

  useLayoutEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isShowScrollUp) return null;

  return (
    <button
      className={styles.scrollUpButton}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span>↑</span>
    </button>
  );
};

export default ScrollToTop;
