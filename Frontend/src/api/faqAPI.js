import api from './config';

export const getAllFAQs = async () => {
  try {
    const response = await api.get('/faqs');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createFAQ = async (faqData) => {
  try {
    const response = await api.post('/faqs', faqData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateFAQ = async (id, faqData) => {
  try {
    const response = await api.put(`/faqs/${id}`, faqData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteFAQ = async (id) => {
  try {
    const response = await api.delete(`/faqs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 