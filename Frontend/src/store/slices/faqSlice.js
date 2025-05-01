import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../api/faqAPI';

// Async thunks
export const fetchFAQs = createAsyncThunk(
  'faq/fetchFAQs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllFAQs();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFAQ = createAsyncThunk(
  'faq/addFAQ',
  async (faqData, { rejectWithValue }) => {
    try {
      const response = await createFAQ(faqData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editFAQ = createAsyncThunk(
  'faq/editFAQ',
  async ({ id, faqData }, { rejectWithValue }) => {
    try {
      const response = await updateFAQ(id, faqData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFAQ = createAsyncThunk(
  'faq/removeFAQ',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFAQ(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  faqs: [],
  loading: false,
  error: null,
  selectedFAQ: null,
};

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    setSelectedFAQ: (state, action) => {
      state.selectedFAQ = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch FAQs
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add FAQ
      .addCase(addFAQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFAQ.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs.push(action.payload);
      })
      .addCase(addFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit FAQ
      .addCase(editFAQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editFAQ.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.faqs.findIndex(faq => faq._id === action.payload._id);
        if (index !== -1) {
          state.faqs[index] = action.payload;
        }
      })
      .addCase(editFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove FAQ
      .addCase(removeFAQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFAQ.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = state.faqs.filter(faq => faq._id !== action.payload);
      })
      .addCase(removeFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedFAQ, clearError } = faqSlice.actions;
export default faqSlice.reducer; 