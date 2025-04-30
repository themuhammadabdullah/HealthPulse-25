import api from './config';

export const getAllContacts = async () => {
  try {
    const response = await api.get('/contact');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createContact = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 