import styles from "./post-body.module.css";

const PostBody = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className={styles.stack}>{children}</div>;
};

export default PostBody;
