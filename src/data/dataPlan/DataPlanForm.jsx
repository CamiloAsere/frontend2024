import { useEffect, useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [dataPlans, setDataPlans] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    dataPlan: '',
    userType: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/dataplan')
      .then(response => {
        setDataPlans(response.data);
        setFormData(formData => ({ ...formData, dataPlan: response.data[0].id }));
      });
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name === '' || formData.email === '' || formData.username === '' || formData.userType === '') {
      setError('Todos los campos son obligatorios');
    } else {
      axios.post('/user', formData)
        .then(response => {
          console.log(response.data);
          setError(null);
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
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Correo electrónico:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Nombre de usuario:
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </label>
      <label>
        Plan de datos:
        <select name="dataPlan" value={formData.dataPlan} onChange={handleChange} required>
          {dataPlans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
        </select>
      </label>
      <label>
        Tipo de usuario:
        <select name="userType" value={formData.userType} onChange={handleChange} required>
          <option value="worker">Trabajador</option>
          <option value="student">Estudiante</option>
          <option value="teacher">Profesor</option>
        </select>
      </label>
      <button type="submit">Agregar usuario</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export { DataPlanForm, UserForm };


function DataPlanForm() {
  const [formData, setFormData] = useState({
    name: '',
    quota: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name === '' || formData.quota === '') {
      setError('Todos los campos son obligatorios');
    } else {
      axios.post('/dataplan', formData)
        .then(response => {
          console.log(response.data);
          setError(null);
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
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Cuota de datos:
        <input type="number" name="quota" value={formData.quota} onChange={handleChange} required />
      </label>
      <button type="submit">Agregar plan de datos</button>
      {error && <p>{error}</p>}
    </form>
  );
}
export default DataPlanForm