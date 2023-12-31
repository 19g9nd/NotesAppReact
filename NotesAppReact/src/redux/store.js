import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice.js';
const store = configureStore({
    reducer: {
     tasksReducer,
    },
})
export default store;