import { ProductType } from "@/Utils/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface listtype {
  list : ProductType[] | []
}

const initialState: listtype = {
  list : []
};


const productSlice = createSlice({
  name: "product",
 initialState,
  reducers: {
    setListProduct: (state, action : PayloadAction<ProductType[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setListProduct } = productSlice.actions;
export default productSlice.reducer;
