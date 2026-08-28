import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [], totalAmount: 0 };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [], totalAmount: 0 };
  }
};

const saveCartToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      
      if (existingItem) {
        if (existingItem.quantity < product.inventoryCount) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      
      if (existingItem) {
        if (quantity > 0 && quantity <= existingItem.inventoryCount) {
          existingItem.quantity = quantity;
        }
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
