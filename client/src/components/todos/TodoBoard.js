"use client";

import React, { useEffect, useRef } from "react";
import { useTodoList } from "../../hooks/useTodoList";
import TodoCard from "./TodoCard";
import TodoStatusTabs from "./TodoStatusTab";
import styles from "./TodoBoard.module.css";

const TodoBoard = () => {
  const {
    todos,
    status,
    setStatus,
    loadMore,
    isLoading,
    hasMore,
    isLoadingMore,
  } = useTodoList();
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && hasMore) {
          await loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoadingMore, hasMore, loadMore]);

  return (
    <div className={styles.container}>
      <TodoStatusTabs activeStatus={status} onStatusChange={setStatus} />

      <div className={styles.grid}>
        {todos.length > 0 && !isLoading ? (
          todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        ) : (
          <p className={styles.noResults}>
            no &quot;{status}&quot; task found.
          </p>
        )}
      </div>

      {isLoading && <p className={styles.loadingText}>Loading...</p>}
      <div ref={observerRef} className={styles.observer}></div>
    </div>
  );
};

export default TodoBoard;
