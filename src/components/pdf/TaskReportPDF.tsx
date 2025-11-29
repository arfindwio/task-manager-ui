import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { Task } from "../../features/tasks/tasksTypes";

// Styles PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flex: 1,
    padding: 6,
    backgroundColor: "#e5e7eb",
    borderRightWidth: 1,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 6,
    borderRightWidth: 1,
  },
});

interface Props {
  tasks: Task[];
}

export const TaskReportPDF = ({ tasks }: Props) => {
  const date = new Date().toLocaleString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Task Management Dashboard</Text>
        <Text style={styles.subtitle}>
          Tasks Report (Report Generated: {date})
        </Text>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Task ID</Text>
            <Text style={styles.tableHeader}>Title</Text>
            <Text style={styles.tableHeader}>Description</Text>
            <Text style={styles.tableHeader}>Status</Text>
          </View>

          {/* Table Rows */}
          {tasks.map((task) => (
            <View style={styles.tableRow} key={task.id}>
              <Text style={styles.tableCell}>{task.id}</Text>
              <Text style={styles.tableCell}>{task.title}</Text>
              <Text style={styles.tableCell}>{task.description}</Text>
              <Text style={styles.tableCell}>
                {task.completed ? "Completed" : "Pending"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
