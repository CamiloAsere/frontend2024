import { useContext } from 'react';
import './axiosConfig';
import { AdminContext } from './AdminContext';
import AdminPanel from './AdminPanel';
const AdminApp = () => {
  const { state, handleAddQuestion, handleEditQuestion, handleUpdateQuestion, handleDeleteQuestion, handlePrevPage, handleNextPage, onSearch  } = useContext(AdminContext);
  const { page, pageSize, searchTerm, questions, totalItems, loading, errorMessage, newQuestion, editingQuestion, currentView } = state;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  return (
    <AdminPanel
        errorMessage={errorMessage} editingQuestion={editingQuestion} currentView={currentView} newQuestion={newQuestion}
        questions={questions} handleUpdateQuestion={handleUpdateQuestion} handleAddQuestion={handleAddQuestion}
        handleEditQuestion={handleEditQuestion} handleDeleteQuestion={handleDeleteQuestion} handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage} searchTerm={searchTerm} onChange={onSearch} loading={loading} page={page} totalPages={totalPages} totalItems={totalItems}
    />
    
)}

export default AdminApp;