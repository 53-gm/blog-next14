import styles from "./two-column.module.css";

export const TwoColumn = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className={styles.flexContainer}>{children}</div>;
};

export const TwoColumnMain = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className={styles.main}>{children}</div>;
};

export const TwoColumnSidebar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className={styles.sidebar}>{children}</div>;
};
