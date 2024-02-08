import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    userInfo: null,
}

export const reducerSlice = createSlice({
    name: "bazaar",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.productData = action.payload;
        },
    },
});

export const { addToCart } = reducerSlice.actions;
export default reducerSlice.reducer;