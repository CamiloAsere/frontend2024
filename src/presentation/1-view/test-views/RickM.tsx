//RickM.tsx
import { ChangeEvent } from "react";
import SearchBar from "./SearchBar";
import useAdminState from "../../4-hooks/useAdminState";
import { DSpinner } from "../../../assets/dinamic spinner/Spinner";
const link:string ='https://rickandmortyapi.com/'
function RickMorty() {
    const initialState = {
        page: 1,pageSize: 10,searchTerm: '',
        totalItems:0,
        questions:[],
        loading: false,
        errorMessage: '',
        editingQuestion: null,
        currentView: 'adding',
    };
    //#caso#0 o caso base las q vienen por defecto en useStateAdmin
    //caso#1 Transformar las propiedades existentes
  const extractRickAndMortyData = (data, state) => {
    return {
        questions:data.results,
        totalItems: data.count,
        pages:  state.pageSize,
    };
  };
    //caso#2 Crear un arreglo de objetos con propiedades especificas
    const transformData = (data, state) => {
    // Transforma los datos de tu endpoint al formato que tu hook espera
    const transformedData = {
      questions: data.map(item => ({ name: item.name, totalQuota: item.totalQuota })),
      totalItems: data.length,
    };
    return transformedData;
  };
 
  /*

En el caso#1, estás transformando los datos de la API de Rick and Morty para que se ajusten 
a la estructura de datos que tu hook espera. Estás extrayendo el array results y lo estás 
asignando a questions, y estás tomando el valor de count y lo estás asignando a totalItems. 
Además, estás pasando el valor de pageSize del estado actual a pages.

En el caso#2, estás transformando un array de datos de tu endpoint al formato que tu hook 
espera. Estás mapeando cada objeto en tu array de datos a un nuevo objeto con las propiedades
 name y totalQuota, y estás asignando este nuevo array a questions. También estás tomando 
 la longitud del array de datos y la estás asignando a totalItems.

  */

  const [state, updateState] = useAdminState(link,undefined,extractRickAndMortyData);
 
const {questions,searchTerm}=state
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ searchTerm: event.target.value });
  
  };
  return (
    <ul>
        <SearchBar searchTerm={searchTerm} onChange={handleSearchChange}/>
        {!questions ? <DSpinner/> : questions.map((card,index) => (
  <li  key={index}>
    <div >{card.questions} </div>
    <div >{card.name} </div>
  </li>
))}

     
    </ul>
  );
}
export default RickMorty;