import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMedicines, createMedicine, updateMedicine, deleteMedicine } from '../../api/medicineAPI';

// Async thunks
export const fetchMedicines = createAsyncThunk(
  'medicine/fetchMedicines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllMedicines();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMedicine = createAsyncThunk(
  'medicine/addMedicine',
  async (medicineData, { rejectWithValue }) => {
    try {
      const response = await createMedicine(medicineData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editMedicine = createAsyncThunk(
  'medicine/editMedicine',
  async ({ id, medicineData }, { rejectWithValue }) => {
    try {
      const response = await updateMedicine(id, medicineData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeMedicine = createAsyncThunk(
  'medicine/removeMedicine',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMedicine(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  medicines: [],
  loading: false,
  error: null,
  selectedMedicine: null,
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setSelectedMedicine: (state, action) => {
      state.selectedMedicine = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch medicines
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add medicine
      .addCase(addMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines.push(action.payload);
      })
      .addCase(addMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit medicine
      .addCase(editMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMedicine.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.medicines.findIndex(med => med._id === action.payload._id);
        if (index !== -1) {
          state.medicines[index] = action.payload;
        }
      })
      .addCase(editMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove medicine
      .addCase(removeMedicine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMedicine.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = state.medicines.filter(med => med._id !== action.payload);
      })
      .addCase(removeMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedMedicine, clearError } = medicineSlice.actions;
export default medicineSlice.reducer; 