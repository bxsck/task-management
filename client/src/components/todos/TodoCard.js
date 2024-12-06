"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "@/lib/apis";
import styles from "./TodoCard.module.css"; // Import CSS module

const TodoCard = ({ todo }) => {
  const queryClient = useQueryClient();

  // Mutation for updating todo status
  const updateMutation = useMutation({
    mutationFn: (newStatus) => updateTodo(todo.id, { status: newStatus }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for deleting todo
  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleStatusChange = (newStatus) => {
    updateMutation.mutate(newStatus);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{todo.title}</h3>
        <button onClick={handleDelete} className={styles.deleteButton}>
          &times;
        </button>
      </div>
      {todo.description && (
        <p className={styles.description}>{todo.description}</p>
      )}
      <p className={styles.createdAt}>
        Created: {new Date(todo.createdAt).toLocaleString()}
      </p>
      <div className={styles.actions}>
        {todo.status !== "TODO" && (
          <button
            onClick={() => handleStatusChange("TODO")}
            className={`${styles.statusButton} ${styles.todo}`}
          >
            To Do
          </button>
        )}
        {todo.status !== "DOING" && (
          <button
            onClick={() => handleStatusChange("DOING")}
            className={`${styles.statusButton} ${styles.doing}`}
          >
            Doing
          </button>
        )}
        {todo.status !== "DONE" && (
          <button
            onClick={() => handleStatusChange("DONE")}
            className={`${styles.statusButton} ${styles.done}`}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
