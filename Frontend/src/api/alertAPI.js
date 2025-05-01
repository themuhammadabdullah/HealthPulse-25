import api from './config';

export const getAllAlerts = async () => {
  try {
    const response = await api.get('/alerts');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAlertById = async (id) => {
  try {
    const response = await api.get(`/alerts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createAlert = async (alertData) => {
  try {
    const response = await api.post('/alerts', alertData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateAlert = async (id, alertData) => {
  try {
    const response = await api.patch(`/alerts/${id}`, alertData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteAlert = async (id) => {
  try {
    const response = await api.delete(`/alerts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 