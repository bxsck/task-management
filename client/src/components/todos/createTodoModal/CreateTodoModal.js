import React, { useState } from "react";
import styles from "./CreateTodoModal.module.css";
import { createTodo } from "../../../lib/apis";
import { TodoStatusEnum } from "@/constants/todo";
const CreateTodoModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [todoDate, setTodoDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = { title, description, status, todo_date: todoDate };
      await createTodo(newTodo);
      onClose();
    } catch (error) {
      alert("Failed to create todo");
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackground} onClick={handleBackgroundClick}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Add new task</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.select}
            >
              {Object.values(TodoStatusEnum).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Todo Date</label>
            <input
              type="date"
              value={todoDate}
              onChange={(e) => setTodoDate(e.target.value)}
              className={styles.dateInput}
              onClick={(e) => e.target.showPicker()}
            />
          </div>
          <button type="submit" className={styles.button}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoModal;
