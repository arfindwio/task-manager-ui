import axios from "axios";
import type { Task } from "./tasksTypes";

export const getTasksAPI = async (): Promise<Task[]> => {
  const response = await axios.get("/src/data/tasks.json");
  return Array.isArray(response.data) ? response.data : [];
};
