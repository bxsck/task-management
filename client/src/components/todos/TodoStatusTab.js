import React, { useEffect } from "react";
import styles from "./TodoStatusTab.module.css"; // Import CSS module

const TODO_STATUSES = ["TODO", "DOING", "DONE"];

const TodoStatusTabs = ({ activeStatus, onStatusChange }) => {
  useEffect(() => {
    onStatusChange("TODO"); // Set default active status to "TODO" on first render
  }, [onStatusChange]);

  return (
    <div className={styles.tabs}>
      {TODO_STATUSES.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`${styles.tabButton} ${
            activeStatus === status ? styles.active : ""
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default TodoStatusTabs;
