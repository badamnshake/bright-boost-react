import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "../../api/axios";
import Header from "../../components/Header";
import Toast from "../../components/toast";

const ATTENDANCE_URL = "/items/SessionAttendee";
// const MARK_AS_ANSWERED_URL = "/items/Question?fields=*,student_id.first_name";

const Attendance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  // State variable to control the success toast
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // State variables for confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sessionId, setSessionId] = useState(2);

  const getQuestionsData = async () => {
    const response = await axios.get(ATTENDANCE_URL, {
      params: {
        fields: "*,student_id.first_name,student_id.last_name",
        "filter[session_id][_eq]": sessionId,
      },
    });
    let qData = response?.data?.data;
    qData = qData.map((x) => {
      return {
        id: x.id,
        student_name: x.student_id?.first_name + " " + x.student_id?.last_name,
      };
    });
    setData(qData);
  };

  useEffect(() => {
    getQuestionsData();
  }, []);

const columns = [
  {
    field: "student_name",
    headerName: "Student Name",
    flex: 5,
    cellClassName: "name-column-cell",
  },
  {
    field: "attendance",
    headerName: "Mark as Attended",
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          ml="auto"
          p="5px"
          display="flex"
          justifyContent="center"
        >
          <input
            type="checkbox"
            checked={row.attendance}
            onChange={() => handleMarkAsAttendedToggle(row)}
          />
        </Box>
      );
    },
  },
];

  const handleMarkAsAnsweredClick = (row) => {
    // Open the dialog and store the selected row
    setIsDialogOpen(true);
    setSelectedRow(row);
  };

const handleMarkAsAttendedToggle = async (row) => {
  try {
    // Toggle the attendance value
    const updatedAttendance = !row.attendance;

    // Send an API request to update the attendance value
    await axios.patch(ATTENDANCE_URL + "/" + row.id, {
      attendance: updatedAttendance,
    });
    console.log("updated successfully");

    // Update the local data with the new attendance value
    const updatedData = data.map((item) =>
      item.id === row.id ? { ...item, attendance: updatedAttendance } : item
    );
    setData(updatedData);

    // Set the success toast message and open the toast
    setToastMessage("Attendance status updated successfully");
    setIsToastOpen(true);
  } catch (error) {
    // Handle any errors here
    console.error("Error updating attendance status:", error);
  }
};

  return (
    <Box m="20px">
      <Header title="Attendance Board" subtitle="student attendance"></Header>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={data} columns={columns} />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Mark as Answered</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to mark this question as answered?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleMarkAsAttendedToggle} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Toast */}
      <Toast
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        severity={"success"}
      />
    </Box>
  );
};

export default Attendance;
