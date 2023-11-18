import { createSlice } from "@reduxjs/toolkit";
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state,action) => {
           
        },
        updateTask: (state,action) => {
           
        },
        deleteTask: (state, action) => {
           
        }
    }
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;