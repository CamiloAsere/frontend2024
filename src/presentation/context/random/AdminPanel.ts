//import QuestionForm from './QuestionForm';
//import QuestionList from './TableQuestionList';
import styles from "./AdminPanel.module.css"
import HandlePage from './HandlePage';
import SearchBar from './searchBar';
import Spinner from './Spinner';
const AdminPanel = ({loading, searchTerm,onChange,handlePrevPage, handleNextPage,page,totalItems, totalPages , errorMessage, editingQuestion, currentView, handleUpdateQuestion, newQuestion, handleAddQuestion, questions, handleEditQuestion, handleDeleteQuestion }) => {
return (
  <div className={styles.container}>
  <h1 className={styles.title}>Panel de administración</h1>
  {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
  <div className={styles.content}>
    <div className={styles.formContainer}>
      {editingQuestion ? (
        <>
          <h2>Editar pregunta</h2>
          {currentView === 'editing' && (
            <div className={styles.editing}>Editing a question...</div>
          )}
          <QuestionForm data={editingQuestion} onSubmit={handleUpdateQuestion} />
        </>
      ) : (
        <>
          <h2>Agregar nueva pregunta</h2>
          {currentView === 'adding' && (
            <div className={styles.adding}>Adding a new question...</div>
          )}
          <QuestionForm data={newQuestion} onSubmit={handleAddQuestion} />
        </>
      )}
    </div>
    <div className={styles.listContainer}>
      <SearchBar searchTerm={searchTerm} onChange={onChange}/>
     
      <h2>Lista de preguntas:{totalItems}</h2>
      {loading ? <Spinner /> 
      : <QuestionList
        questions={questions}
        handleEditQuestion={handleEditQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
        searchTerm={searchTerm}
      />}
      <HandlePage  handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} page={page} totalItems={totalItems} totalPages={totalPages}/>
    </div>

  </div>
</div>
);
};
export default AdminPanel;