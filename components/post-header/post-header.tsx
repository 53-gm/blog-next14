import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./post-header.module.css";

const PostHeader = ({
  title,
  subtitle,
  date = "",
}: Readonly<{ title: string; subtitle: string; date: string }>) => {
  return (
    <div className={styles.stack}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>
      {date && (
        <div className={styles.publish}>
          <FontAwesomeIcon icon={faClock} size="lg" color="var(--gray-25)" />
          <span>{date}</span>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
