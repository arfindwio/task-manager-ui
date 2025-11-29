import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksAPI } from "./tasksAPI";
import type { Task } from "./tasksTypes";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const data = await getTasksAPI();
    return data;
  },
);
