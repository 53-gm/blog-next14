import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./post-tags.module.css";

const PostTags = ({ tags }: Readonly<{ tags: string[] }>) => {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.heading}>
        <FontAwesomeIcon icon={faFolderOpen} />
        <span className="sr-only">Tags</span>
      </h3>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/blog/tag/${tag}/1`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostTags;
