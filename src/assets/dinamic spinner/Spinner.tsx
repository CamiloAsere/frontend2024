//import { FaSpinner } from "react-icons/fa";
import FaSpinner from "./icon-spinner.gif";

import styles from "./Spinner.module.css";

export function DSpinner() {
  return (
    <div className={styles.spinner}>
      <img src={FaSpinner} className={styles.spinning} size={60} />
    </div>
  );
}
