import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify([...state]));
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        localStorage.setItem("tasks", JSON.stringify([...state]));
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      const index = state.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify([...state]));
      }
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
