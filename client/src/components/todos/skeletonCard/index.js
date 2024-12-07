import styles from "./SkeletonCard.module.css";

const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.header}>
        <div className={styles.title}></div>
      </div>
      <div className={styles.description}></div>
      <div className={styles.dates}>
        <div className={styles.date}></div>
        <div className={styles.date}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
