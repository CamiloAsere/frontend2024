import React from 'react'

import styles from "./AdminPanel.module.css"
function SearchBar({searchTerm,onChange}) {

    return (
    <input className={styles.search}
    type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={onChange}
    />
  )
}

export default SearchBar
/*
function SearchResult({ result, searchTerm }) {
  const highlightedResult = result.split(searchTerm).join(`<span class="highlight">${searchTerm}</span>`);
  return <div dangerouslySetInnerHTML={{ __html: highlightedResult }} />;
}
*/