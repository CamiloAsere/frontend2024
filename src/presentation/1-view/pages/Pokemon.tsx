import React, { ChangeEvent } from 'react';
import useAdminState from '../../4-hooks/useAdminState';
import SearchBar from '../test-views/SearchBar';
import Highlight from '../test-views/Highlight';
import moduleName from '../components/';


  
const Pokemon: React.FC = () => {

const link='http://localhost:8080/api/questions'
const [state, updateState] = useAdminState(link);
const {questions, page, pageSize, totalItems ,errorMessage ,loading,searchTerm}=state

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ searchTerm: event.target.value });
    const totalPages =Math.ceil(totalItems / pageSize );
    console.log("pagina: ",page)
    console.log("las preguntas son: ",questions)
    console.log("Total Pages es: ",totalPages)
  
  };

   const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateState({ pageSize: parseInt(event.target.value, 10) });
  };

  return (
    <div>
        <AdminApp/>
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange}/>
      <select value={state.pageSize} onChange={handlePageSizeChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <p>total pages: {totalItems}, page {page}</p>
      {loading ? (
        <p>Cargando...</p>
      ) : errorMessage ? (
        <p>Error: {state.errorMessage}</p>
      ) : (
        questions.map((question) => (
            <div style={{display:"flex",alignItems:"center",alignContent:"center"}} key={question.id}>
              <Highlight text={question.question} searchTerm={searchTerm} />
              <img alt="no-pic" src={question.image} width={80} height={80} style={{borderRadius:"1.6rem"}}/>
            </div>
          ))   
      )}
     
    </div>
  );
};

export default Pokemon;
