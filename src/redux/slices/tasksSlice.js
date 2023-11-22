import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { matchSorter } from "match-sorter";

const fakeNetwork = async (taskId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Fetching task with ID: ${taskId}`);
};

export const fetchTask = createAsyncThunk("tasks/fetchTask", async (taskId) => {
  await fakeNetwork(`task:${taskId}`);
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((task) => task.id === taskId);
    return task || null;
  } catch (error) {
    console.error("Error parsing tasks:", error);
    throw error;
  }
});
export const fetchTasksFromLocalStorage = createAsyncThunk(
  "tasks/fetchTasksFromLocalStorage",
  async (query) => {
    await fakeNetwork();
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      if (query) {
        tasks = tasks.filter(
          (task) =>
            matchSorter([task], query, { keys: ["title", "description"] })
              .length > 0
        );
      }

      return tasks;
    } catch (error) {
      console.error("Error parsing tasks:", error);
      throw error;
    }
  }
);
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: JSON.parse(localStorage.getItem("tasks")) || [],
  reducers: {
    addTask: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;

      // Create a new array without the deleted task
      const updatedTasks = state.filter((task) => task.id !== taskId);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      // Update the state with the new array
      return updatedTasks;
    },
    updateTask: (state, action) => {
      console.log(action.payload);
      const { id, newTitle, newDescription } = action.payload;

      const taskIndex = state.findIndex((task) => task.id === id);

      state[taskIndex].title = newTitle;
      state[taskIndex].description = newDescription;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      // Update the state with the fetched task
      return action.payload ? [action.payload] : [];
    });
  },
});

export const { addTask, deleteTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
