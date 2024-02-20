import Container from "@/components/container/container";
import Logo from "@/components/logo/logo";
import Social from "@/components/social/social";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.flexContainer}>
          <Logo />
          <Social />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;