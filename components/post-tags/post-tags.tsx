import { Tag } from "@/lib/types";
import SingleTag from "../tag/tag";
import styles from "./post-tags.module.css";

const PostTags = ({ tags }: Readonly<{ tags: Tag[] }>) => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.list}>
        {tags != undefined ? tags.map((tag) => (
          <SingleTag {...tag} key={tag.id} />
        )) : null}
      </div>
    </div>
  );
};

export default PostTags;
