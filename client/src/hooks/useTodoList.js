"use client";
import { useState, useEffect } from "react";
import { getTodoList } from "@/lib/apis";

const LIMIT = 10;
export const useTodoList = (initialStatus = null) => {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState(initialStatus);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    console.log("useEffect", status, page);
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await getTodoList(status, page, LIMIT);
        setTodos(data?.todos || []);
        setHasMore(data.length > 0);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [status]);

  const loadMore = async () => {
    console.log("loadMore", page, isLoadingMore, hasMore);
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const newOffset = page + 1; // Increment offset by 1
      setPage(newOffset);
      const data = await getTodoList(status, newOffset);
      console.log("data", data?.todos);
      if (todos?.todos?.length > 0) {
        setTodos((prev) => [...prev, ...data?.todos]);
      } else {
        setTodos(data?.todos);
      }

      console.log("todos", todos);

      setPage(newOffset);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error("Failed to load more todos:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    todos,
    status,
    setStatus,
    loadMore,
    isLoading,
    hasMore,
    isLoadingMore,
  };
};
