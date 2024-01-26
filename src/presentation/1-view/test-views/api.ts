// api.js
import axios from 'axios';

export async function assignDataPlanToUser(userId, dataPlanName) {
  const response = await axios.post(`/api/users/${userId}/dataPlans/${dataPlanName}`);
  return response.data;
}
