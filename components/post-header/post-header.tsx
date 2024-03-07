import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import styles from "./post-header.module.css";

const PostHeader = ({
  title,
  subtitle,
  date = "",
}: Readonly<{ title: string; subtitle: string; date: string }>) => {
  const dateJA = date != "" ? format(parseISO(date), "yyyy年MM月dd日", { locale: ja }) : "";
  return (
    <div className={styles.stack}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>
      {date && (
        <div className={styles.publish}>
          <span>{dateJA}</span>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
