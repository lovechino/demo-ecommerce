import { CartIntemType } from "@/Utils/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as Array<CartIntemType>,
  },
  reducers: {
    updateQuantity(state, action: PayloadAction<CartIntemType>) {
      const { id, qualitiy } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        // Update totalAmount chính xác

        existingItem.qualitiy = qualitiy;
      }
    },
    addItem(state, action) {
      const newItem = action.payload;
      console.log("Price of newItem:", newItem.Price);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.qualitiy++;
      } else {
        state.items.push({ ...newItem, qualitiy: 1 });
      }
    },
    inCreaseItem(state, action: PayloadAction<CartIntemType>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.qualitiy++;
      }
    },

    deCreaseItem(state, action: PayloadAction<CartIntemType>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem && existingItem.qualitiy > 1) {
        existingItem.qualitiy--;
      } else if (existingItem && existingItem.qualitiy === 1) {
        state.items = state.items.filter((item) => item.id !== newItem.id);
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  inCreaseItem,
  deCreaseItem,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
