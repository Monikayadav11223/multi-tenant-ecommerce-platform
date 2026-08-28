import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

export const fetchStores = createAsyncThunk('admin/fetchStores', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/stores');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch stores');
  }
});

export const deleteStore = createAsyncThunk('admin/deleteStore', async (storeId, { rejectWithValue }) => {
  try {
    await api.delete(`/stores/${storeId}`);
    return storeId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete store');
  }
});

export const deleteProductAdmin = createAsyncThunk('admin/deleteProduct', async (productId, { rejectWithValue }) => {
  try {
    await api.delete(`/products/${productId}`);
    return productId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(fetchStores.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchStores.fulfilled, (state, action) => { state.loading = false; state.stores = action.payload; })
      .addCase(fetchStores.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.stores = state.stores.filter(store => store._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
