"use client";
import React, { useEffect, useRef, useState } from "react";
import { getTodoList } from "@/lib/apis";
import TodoCard from "../todoCard";
import TodoStatusTabs from "../todoStatusTab";
import styles from "./TodoBoard.module.css";
import { TodoStatusEnum } from "@/constants/todo";
import CreateTodoModal from "@/components/todos/createTodoModal/CreateTodoModal";
import SkeletonCard from "../skeletonCard";

const LIMIT = 10;

const TodoBoard = () => {
  const observerRef = useRef();

  const [selectedStatus, setSelectedStatus] = useState(TodoStatusEnum.TODO);
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("todos:", todos);

  useEffect(() => {
    const fetchTodos = async () => {
      console.log("initial fetchTodos", selectedStatus);
      setIsLoading(true);
      try {
        const data = await getTodoList(selectedStatus, 1, LIMIT);
        setTodos(data?.todos || []);
        setHasMore((data?.todos?.length || 0) >= LIMIT);
        setPage(1);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [selectedStatus]);

  const refetchTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getTodoList(selectedStatus, 1, LIMIT);
      setTodos(data?.todos || []);
      setHasMore((data?.todos?.length || 0) >= LIMIT);
      setPage(1);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    console.log("loadMore");
    if (isLoadingMore || !hasMore || isLoading) return;

    const nextPage = page + 1;

    setIsLoadingMore(true);
    try {
      const data = await getTodoList(selectedStatus, nextPage, LIMIT);
      const newTodos = data?.todos || [];

      setTodos((prevTodos) => [...prevTodos, ...newTodos]);
      setHasMore(newTodos.length >= LIMIT);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more todos:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, hasMore]);

  const groupedTodos = todos.reduce((groups, todo) => {
    const date = new Date(todo.todo_date).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});

  const renderSkeletons = () => {
    return (
      <div className={styles.grid}>
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <TodoStatusTabs
          activeStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
        <button
          className={styles.createTodoButton}
          onClick={() => setIsModalOpen(true)}
          aria-label="Add new task"
        >
          +
        </button>
      </div>

      <div className={styles.todoList}>
        {isLoading ? (
          renderSkeletons()
        ) : todos.length === 0 ? (
          <p className={styles.noResults}>
            no &quot;{selectedStatus}&quot; task found.
          </p>
        ) : (
          Object.entries(groupedTodos)
            .sort((a, b) => new Date(a[0]) - new Date(b[0]))
            .map(([date, todosForDate]) => (
              <div key={date} className={styles.dateGroup}>
                <h2 className={styles.dateHeader}>{date}</h2>
                <div className={styles.grid}>
                  {todosForDate.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onDelete={refetchTodos}
                    />
                  ))}
                </div>
              </div>
            ))
        )}
      </div>

      <div ref={observerRef} className={styles.observer}></div>
      {isModalOpen && (
        <CreateTodoModal
          onClose={() => {
            setIsModalOpen(false);
            refetchTodos();
          }}
        />
      )}
    </div>
  );
};

export default TodoBoard;
