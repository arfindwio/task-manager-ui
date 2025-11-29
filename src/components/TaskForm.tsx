import { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTask } from "../features/tasks/tasksSlice";

export const TaskForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAdd = () => {
    if (!title.trim()) {
      setMessage({ type: "error", text: "Title is required" });
      return;
    }

    dispatch(addTask({ title, description }));
    setTitle("");
    setDescription("");
    setMessage({ type: "success", text: "Task added successfully!" });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="col-span-3 flex flex-col gap-4 rounded-md bg-white p-6 shadow-md sm:col-span-1">
      <h2 className="text-2xl font-bold text-black">Create New Task</h2>

      {message && (
        <div
          className={`rounded-md px-3 py-2 text-sm ${
            message.type === "success"
              ? "border border-green-800 bg-green-100 text-green-700"
              : "border border-red-800 bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm text-slate-700">
          Task Title (required)
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-sm border px-3 py-1 text-sm"
          placeholder="Example: Monthly Grocery Shopping"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm text-slate-700">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none rounded-sm border px-3 py-1 text-sm"
          placeholder="Task detail..."
          rows={3}
        />
      </div>
      <button
        onClick={handleAdd}
        className="rounded-md bg-blue-700 py-2 font-bold text-white hover:bg-blue-800"
      >
        Add Task
      </button>
    </div>
  );
};
