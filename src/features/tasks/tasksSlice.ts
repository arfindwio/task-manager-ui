import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Task,
  AddTaskPayload,
  DeleteTaskPayload,
  TasksState,
} from "./tasksTypes";
import { fetchTasks } from "./tasksThunks";

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<AddTaskPayload>) {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    deleteTask(state, action: PayloadAction<DeleteTaskPayload>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    toggleComplete(state, action: PayloadAction<DeleteTaskPayload>) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.completed = !task.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      });
  },
});

export const { addTask, deleteTask, toggleComplete } = tasksSlice.actions;
export default tasksSlice.reducer;
