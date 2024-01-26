import React, { FC } from 'react';
import axios from 'axios';
import { useStore } from '../../store/userPlanData';
const DataPlanForm: FC = () => {
  const dataPlanData = useStore(state => state.dataPlanData);
  const error = useStore(state => state.error);
  const setDataPlanData = useStore(state => state.setDataPlanData);
  const setError = useStore(state => state.setError);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataPlanData({ ...dataPlanData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (dataPlanData.name === '' || dataPlanData.quota === '') {
      setError('Todos los campos son obligatorios');
    } else {
      axios.post('/dataplan', dataPlanData)
        .then(response => {
          console.log(response.data);
          setError(null);
          setDataPlanData({ name: '', quota: '' }); // Limpiar el formulario
        })
        .catch(error => {
          if (error.response) {
            setError(`Error: ${error.response.data.message}`);
          } else {
            console.error(error);
            setError('Ocurrió un error inesperado');
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del plan:
        <input type="text" name="name" value={dataPlanData.name} onChange={handleChange} required />
      </label>
      <label>
        Cuota de datos:
        <input type="number" name="quota" value={dataPlanData.quota} onChange={handleChange} required />
      </label>
      <button type="submit">Agregar plan de datos</button>
      {error && <p>{error}</p>}
    </form>
  );
};
export default DataPlanForm;