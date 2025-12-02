import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTasks } from "../features/tasks/tasksThunks";
import { createTaskPdf } from "../utils/createTaskPdf";

// Components
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { PDFPreviewModal } from "../components/PDFPreviewModal";

// Icons
import { MdOutlineFileDownload } from "react-icons/md";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handlePreviewPdf = () => {
    const doc = createTaskPdf(tasks);
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);

    setPdfUrl(url);
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="mx-auto w-full">
        <div className="mx-auto w-[90%] max-w-7xl pt-8">
          <div className="flex w-full flex-col items-center justify-between border-b-2 pb-2 sm:flex-row sm:pb-0">
            <h2 className="py-2 text-center text-3xl font-bold text-blue-500 sm:text-start">
              Task Management Dashboard
            </h2>
            <button
              onClick={handlePreviewPdf}
              className="flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
            >
              <MdOutlineFileDownload size={20} />
              <p className="font-semibold">Download PDF</p>
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full py-8">
        <div className="mx-auto w-[90%] max-w-7xl">
          <div className="grid w-full grid-cols-3 gap-8">
            <TaskForm />
            <TaskList tasks={tasks} loading={loading} />
          </div>
        </div>
      </section>

      {showPreview && (
        <PDFPreviewModal onClose={() => setShowPreview(false)}>
          <iframe src={pdfUrl} width="100%" height="100%" title="PDF Preview" />
        </PDFPreviewModal>
      )}
    </div>
  );
};
