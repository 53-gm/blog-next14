import { Tag } from "@/lib/types";
import Link from "next/link";
import styles from "./tag.module.css";

const SingleTag = ({ id, name }: Readonly<Tag>) => {
  return (
    <div className={styles.tag}>
      <Link href={`/blog/tag/${id}`} style={styles}>
        {name}
      </Link>
    </div>
  );
};

export default SingleTag;
