import api from './config';

export const getAllSales = async () => {
  try {
    const response = await api.get('/medicine-sales');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getSaleById = async (id) => {
  try {
    const response = await api.get(`/medicine-sales/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createSale = async (saleData) => {
  try {
    const response = await api.post('/medicine-sales', saleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteSale = async (id) => {
  try {
    const response = await api.delete(`/medicine-sales/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 