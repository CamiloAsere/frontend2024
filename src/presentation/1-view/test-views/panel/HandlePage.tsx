import React from 'react'

import styles from "./AdminPanel.module.css"
function HandlePage({ handlePrevPage,loading, handleNextPage, page, totalPages}) {
  return (
    <div className={styles.pageContainer}>
      <button className={styles.button} onClick={handlePrevPage} disabled={page === 1}  >prev</button>
      <span>Page {page} of {totalPages} </span>
      <button className={styles.button} onClick={handleNextPage} disabled={loading ||page === totalPages}>next</button>
      </div>
  )
}

export default HandlePage