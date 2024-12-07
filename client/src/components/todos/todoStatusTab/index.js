import React from "react";
import styles from "./TodoStatusTab.module.css";

const TODO_STATUSES = ["TODO", "DOING", "DONE"];

const TodoStatusTabs = ({ activeStatus, onStatusChange }) => {
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
