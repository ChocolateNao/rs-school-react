import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner} />
      <p className={styles.loading__text}>Loading...</p>
    </div>
  );
}

export default Loader;
