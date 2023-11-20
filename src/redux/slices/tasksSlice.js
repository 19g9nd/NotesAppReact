import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  async () => {
    await fakeNetwork();
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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
      const taskIndex = state.findIndex((task) => task.id === action.payload);

      state.splice(taskIndex, 1);
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
