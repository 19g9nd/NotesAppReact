import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const { taskId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTask: (state, action) => {
      const { taskId, title, description } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
});

export const { addTask, toggleTaskCompletion, updateTask, deleteTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
