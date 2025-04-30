import api from './config';

export const getDashboardOverview = async () => {
  try {
    const response = await api.get('/dashboard/overview');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMedicineAnalytics = async (period) => {
  try {
    const response = await api.get('/dashboard/medicine-analytics', {
      params: { period }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDiseaseHeatmap = async () => {
  try {
    const response = await api.get('/dashboard/disease-heatmap');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 