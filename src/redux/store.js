import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice.js';
export default configureStore({
    reducer: {
     tasksReducer,
    },
})