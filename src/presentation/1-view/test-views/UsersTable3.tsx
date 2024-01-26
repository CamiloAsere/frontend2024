import { useState } from 'react';
import { assignDataPlanToUser } from './api';

function UserList({ users, onEdit, onDelete }) {
  const dataPlans = ['Plan 1', 'Plan 2', 'Plan 3'];
  const [selectedDataPlan, setSelectedDataPlan] = useState(dataPlans[0]);

  const handleAssignPlan = async (user) => {
    try {
      await assignDataPlanToUser(user.id, selectedDataPlan);
      alert(`Plan de datos ${selectedDataPlan} asignado al usuario ${user.name}`);
    } catch (error) {
      alert('Error al asignar el plan de datos');
    }
  };

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <button onClick={() => onEdit(user)}>Editar</button>
          <button onClick={() => onDelete(user)}>Eliminar</button>
          {!user.dataPlan && (
            <div>
              <select value={selectedDataPlan} onChange={e => setSelectedDataPlan(e.target.value)}>
                {dataPlans.map(plan => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>
              <button onClick={() => handleAssignPlan(user)}>Asignar Plan</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserList;
