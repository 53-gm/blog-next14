import { eyecatchLocal } from "@/lib/metadata";
import { PostMetaData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import SingleTag from "../tag/tag";
import styles from "./poster.module.css";

const Poster = ({ slug, eyecatch, title, tags }: Readonly<PostMetaData>) => {
  return (
    <article className={styles.post}>
      <Link href={`/blog/${slug}`}>
        <figure>
          <Image
            src={eyecatch ? eyecatch.url : eyecatchLocal.url}
            alt={slug}
            fill
            sizes="(min-width: 1152px) 576px, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </figure>
        <h2>{title}</h2>
      </Link>
      <div className={styles.flexContainer}>
        {tags.map((tag) => (
          <SingleTag key={tag.id} {...tag} />
        ))}
      </div>
    </article>
  );
};

export default Poster;
