import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducerSlice.js'
export const store = configureStore({
    reducer: {
        bazaar : cartReducer,
    },
});