import styles from "../styles/Paper.module.scss";

const Paper = ({ children }) => {
  return <div className={styles.paper}>{children}</div>;
};

export default Paper;
