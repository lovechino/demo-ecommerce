import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  activeItem: string;
}

const initialState: NavState = {
  activeItem: 'home'
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = navSlice.actions;
export default navSlice.reducer; 