import React from 'react';
import styles from "./Table.module.css"
const Highlight = ({ text, searchTerm }) => {
  if (!searchTerm) {
    return text;
  }
  return (
    <>
      {text.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) =>
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