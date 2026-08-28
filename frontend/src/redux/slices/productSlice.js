import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchMyProducts = createAsyncThunk('products/fetchMine', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/products/my-products');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch your products');
  }
});

export const createProduct = createAsyncThunk('products/create', async (productData, { rejectWithValue }) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchMyProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchMyProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createProduct.fulfilled, (state, action) => { state.items.push(action.payload); });
  },
});

export default productSlice.reducer;
