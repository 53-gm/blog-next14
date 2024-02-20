import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./social.module.css";

const Social = () => {
  return (
    <ul className={styles.list}>
      <li>
        <a href="https://twitter.com/">
          <FontAwesomeIcon icon={faTwitter} size="sm" />
          <span className="sr-only">Twitter</span>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/">
          <FontAwesomeIcon icon={faFacebookF} size="sm" />
          <span className="sr-only">Facebook</span>
        </a>
      </li>
      <li>
        <a href="https://github.com/">
          <FontAwesomeIcon icon={faGithub} size="sm" />
          <span className="sr-only">GitHub</span>
        </a>
      </li>
    </ul>
  );
};

export default Social;
