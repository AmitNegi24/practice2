import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    userInfo: null,
};

export const reducerSlice = createSlice({
    name: "bazaar",
    initialState,
    reducers: {
        // Add item to cart
        addToCart: (state, action) => {

            const item = state.productData.find(
                (item) => item.id === action.payload.id && item.title === action.payload.title
            );
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.productData.push(action.payload);
            }
        },

        // Delete item from cart (by ID)
        deleteItem: (state, action) => {
            // If the payload is just the `id` of the item to be removed
            state.productData = state.productData.filter((item) => item.id !== action.payload);
        },

        // Reset the entire cart
        resetCart: (state) => {
            state.productData = [];
        },

        // Increment item quantity in the cart
        incrementQuantity: (state, action) => {
            const item = state.productData.find(
                (item) => item.id === action.payload.id && item.title === action.payload.title
            );
            if (item) {
                item.quantity++;
            }
        },

        // Decrement item quantity in the cart
        decrementQuantity: (state, action) => {
            const item = state.productData.find(
                (item) => item.id === action.payload.id && item.title === action.payload.title
            );
            if (item) {
                item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
            }
        },

        // Add user info to the state
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },

        // Remove user info from the state
        removeUser: (state) => {
            state.userInfo = null;
        },
    },
});

// Export actions for use in components
export const { 
    addToCart, 
    deleteItem, 
    resetCart, 
    incrementQuantity, 
    decrementQuantity, 
    addUser, 
    removeUser 
} = reducerSlice.actions;

export default reducerSlice.reducer;
