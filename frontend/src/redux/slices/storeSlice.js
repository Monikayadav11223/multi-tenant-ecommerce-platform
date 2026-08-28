import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchVendorStore = createAsyncThunk('store/fetchVendor', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/vendor/store');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch store');
  }
});

export const createVendorStore = createAsyncThunk('store/create', async (storeData, { rejectWithValue }) => {
  try {
    const response = await api.post('/vendor/store', storeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create store');
  }
});

export const updateVendorStore = createAsyncThunk('store/update', async (storeData, { rejectWithValue }) => {
  try {
    const response = await api.patch('/vendor/store', storeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update store');
  }
});

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    vendorStore: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorStore.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchVendorStore.fulfilled, (state, action) => { state.loading = false; state.vendorStore = action.payload; })
      .addCase(fetchVendorStore.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(createVendorStore.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createVendorStore.fulfilled, (state, action) => { state.loading = false; state.vendorStore = action.payload; })
      .addCase(createVendorStore.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateVendorStore.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateVendorStore.fulfilled, (state, action) => { state.loading = false; state.vendorStore = action.payload; })
      .addCase(updateVendorStore.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default storeSlice.reducer;
