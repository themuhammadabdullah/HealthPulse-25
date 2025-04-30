import api from './config';

export const getAllReports = async () => {
  try {
    const response = await api.get('/reports');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReportById = async (id) => {
  try {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createReport = async (reportData) => {
  try {
    const response = await api.post('/reports', reportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateReport = async (id, reportData) => {
  try {
    const response = await api.patch(`/reports/${id}`, reportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteReport = async (id) => {
  try {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 