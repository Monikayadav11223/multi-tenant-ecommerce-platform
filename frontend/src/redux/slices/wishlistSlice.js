import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get('/api/customer/wishlist', config);
    return data; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.post('/api/customer/wishlist', { productId }, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (productId, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.delete(`/api/customer/wishlist/${productId}`, config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload || [];
      });
  },
});

export default wishlistSlice.reducer;
