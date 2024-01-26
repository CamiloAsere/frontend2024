import styles from '../../../assets/AdminPanel.module.css'
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