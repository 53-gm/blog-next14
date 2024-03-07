import { PostMetaData } from "@/lib/types";
import Poster from "../poster/poster";
import styles from "./posts.module.css";

const Posts = ({ posts }: { posts: PostMetaData[] }) => {
  return (
    <div className={styles.gridContainer}>
      {posts.map((post) => (
        <Poster {...post} key={post.slug} />
      ))}
    </div>
  );
};

export default Posts;
