import { useAppDispatch } from "../app/hooks";
import { deleteTask, toggleComplete } from "../features/tasks/tasksSlice";
import type { Task } from "../features/tasks/tasksTypes";

// Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
}

export const TaskList = ({ tasks, loading }: TaskListProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => dispatch(deleteTask({ id }));
  const handleToggleComplete = (id: number) => dispatch(toggleComplete({ id }));

  if (loading) return <p>Loading...</p>;
  if (tasks.length === 0)
    return (
      <div className="col-span-3 flex flex-col items-center justify-center gap-1 rounded-sm bg-white px-4 py-16 shadow-sm sm:col-span-2">
        <h5 className="text-xl font-medium text-slate-700">
          🎉 Your task list is empty!
        </h5>
        <p className="text-base font-normal text-slate-600">
          Start by adding a new task from the form on the left.
        </p>
      </div>
    );

  return (
    <div className="col-span-3 flex flex-col gap-4 sm:col-span-2">
      <h2 className="border-b pb-2 text-2xl font-bold text-black">
        Task List ({tasks.length})
      </h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between gap-2 rounded-md bg-white p-4 shadow-md"
        >
          <div className="flex flex-col">
            <h5
              className={`text-xl font-medium ${
                task.completed ? "text-slate-400 line-through" : "text-black"
              }`}
            >
              {task.title}
            </h5>
            {task.description && (
              <p
                className={`break-all text-sm ${
                  task.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-700"
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
          <div className="flex w-fit gap-2">
            <button
              onClick={() => handleToggleComplete(task.id)}
              className={`rounded-full p-3 text-white ${
                task.completed
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {!task.completed ? (
                <FaCheck size={18} />
              ) : (
                <IoCloseSharp size={18} />
              )}
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="rounded-full bg-red-500 p-3 text-white hover:bg-red-600"
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
