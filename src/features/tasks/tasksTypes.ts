export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface AddTaskPayload {
  title: string;
  description: string;
}

export interface DeleteTaskPayload {
  id: number;
}
