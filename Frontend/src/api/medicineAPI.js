import api from './config';

export const getAllMedicines = async () => {
  try {
    const response = await api.get('/medicines');
    return response.data;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error.response?.data || error.message;
  }
};

export const getMedicineById = async (id) => {
  try {
    const response = await api.get(`/medicines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching medicine:', error);
    throw error.response?.data || error.message;
  }
};

export const createMedicine = async (medicineData) => {
  try {
    console.log('Sending medicine data:', medicineData);
    const response = await api.post('/medicines', medicineData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Medicine created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating medicine:', error);
    throw error.response?.data || error.message;
  }
};

export const updateMedicine = async (id, medicineData) => {
  try {
    console.log('Sending update data:', medicineData);
    const response = await api.patch(`/medicines/${id}`, medicineData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Medicine updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error.response?.data || error.message;
  }
};

export const deleteMedicine = async (id) => {
  try {
    const response = await api.delete(`/medicines/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting medicine:', error);
    throw error.response?.data || error.message;
  }
}; 