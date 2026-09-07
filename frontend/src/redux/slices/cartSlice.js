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
      const { productId, storeId, price, name, image, inventoryCount, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      
      if (existingItem) {
        if (existingItem.quantity + quantity <= existingItem.inventoryCount) {
          existingItem.quantity += quantity;
        } else {
          existingItem.quantity = existingItem.inventoryCount;
        }
      } else {
        state.items.push({ productId, storeId, price, name, image, inventoryCount, quantity });
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      
      if (existingItem && existingItem.quantity < existingItem.inventoryCount) {
        existingItem.quantity += 1;
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
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

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
