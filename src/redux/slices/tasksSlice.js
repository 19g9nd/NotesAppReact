import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
      addTask: (state, action) => {
          state.push(action.payload);
      },
      deleteTask: (state, action) => {
          const taskIndex = state.findIndex(task => task.id === action.payload);

          state.splice(taskIndex, 1);
      },
      updateTask: (state, action) => {
          const {id, newTitle,newDescription} = action.payload;

          const taskIndex = state.findIndex(task => task.id === id);

          state[taskIndex].title = newTitle;
          state[taskIndex].description = newDescription;
      }
  }
});

export const { addTask, deleteTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;