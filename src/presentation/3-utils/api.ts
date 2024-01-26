// api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Question } from '../../store/panel/store';
export const createApi = (baseURL: string): AxiosInstance => {
  return axios.create({ baseURL });
};

export const fetchQuestions = (api: AxiosInstance) => async (page: number, pageSize: number, searchTerm: string): Promise<Question[]> => {
  try {
    const response: AxiosResponse<Question[]> = await api.get('', { params: { page, pageSize, searchTerm } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addQuestion = (api: AxiosInstance) => async (data: Question): Promise<Question> => {
  try {
    const response: AxiosResponse<Question> = await api.post('', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = (api: AxiosInstance) => async (id: string, data: Question): Promise<Question> => {
  try {
    const response: AxiosResponse<Question> = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = (api: AxiosInstance) => async (id: string): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw error;
  }
};
