import Link from "next/link";
import styles from "./logo.module.css";

const Logo = ({boxOn = false} : Readonly<{boxOn? : boolean}>) => {
  return (
    <Link href="/" className={boxOn ? styles.box : styles.basic}>
      MdyCode
    </Link>
  )
};

export default Logo;