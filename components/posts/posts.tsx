import Image from "next/image";
import Link from "next/link";
import styles from "./posts.module.css";

import { Post } from "@/lib/notionAPI";

const Posts = ({ posts }: Readonly<{ posts: Post[] }>) => {
  return (
    <div className={styles.gridContainer}>
      {posts.map(({ title, slug, thumbnail, id }) => (
        <article className={styles.post} key={id}>
          <Link href={`/blog/${slug}`}>
            <figure>
              <Image
                src={thumbnail ? thumbnail : "/vercel.svg"}
                alt=""
                fill={true}
                sizes="(min-width: 1152px) 576px, 50vw"
                style={{objectFit:"cover"}}
                priority={true}
              />
            </figure>
            <h2>{title}</h2>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default Posts;
