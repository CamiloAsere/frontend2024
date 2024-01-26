
import React from "react";
import styles from "../../../assets/TableQ.module.css"
const Highlight = ( {text, searchTerm }) => {
  if (!searchTerm) {
    return text;
  }
  return (
    <>
      {text.split(new RegExp(`(${searchTerm})`, 'gi')).map((part:string, i:number) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={i}  className={styles.highlight}>
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default Highlight;