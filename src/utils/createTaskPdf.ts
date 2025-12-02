import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { Task } from "../features/tasks/tasksTypes";

export const createTaskPdf = (tasks: Task[]) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  doc.setFontSize(18);
  doc.text("Task Management Dashboard", 14, 15);

  doc.setFontSize(12);
  doc.text(`Task Report (Report Generated: ${date})`, 14, 25);

  autoTable(doc, {
    startY: 35,
    head: [["Task ID", "Title", "Description", "Status"]],
    body: tasks.map((task) => [
      task.id,
      task.title,
      task.description ?? "-",
      task.completed ? "Completed" : "Pending",
    ]),
    styles: {
      fontSize: 11,
      cellPadding: 3,
      valign: "middle",
      overflow: "linebreak",
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      textColor: 0,
    },
    headStyles: {
      fillColor: [226, 232, 240],
      textColor: 0,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
      textColor: 0,
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 50 },
      2: { cellWidth: 80 },
      3: { cellWidth: 30 },
    },
  });

  return doc;
};
