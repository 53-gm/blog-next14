import cube from "@/public/mdy.jpg";
import Image from "next/legacy/image";
import styles from "./hero.module.css";

const Hero = ({
  title,
  subtitle,
  imageOn = false,
}: Readonly<{ title: string; subtitle: string; imageOn?: boolean }>) => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {imageOn && (
        <figure className={styles.image}>
          <Image
            src={cube}
            alt=""
            layout="responsive"
            sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
            priority
          />
        </figure>
      )}
    </div>
  );
};

export default Hero;