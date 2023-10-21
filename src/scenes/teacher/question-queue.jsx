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

const QUESTION_URL = "/items/Question";
// const MARK_AS_ANSWERED_URL = "/items/Question?fields=*,student_id.first_name";

const QuestionQueue = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  // State variable to control the success toast
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // State variables for confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sessionId, setSessionId] = useState(2);

  const getQuestionsData = async () => {
    const response = await axios.get(QUESTION_URL, {
      params: {
        fields: "*,student_id.first_name",
        "filter[answered_time][_null]": "true",
        "filter[session_id][_eq]": sessionId,
      },
    });
    let qData = response?.data?.data;
    qData = qData.map((x) => {
      return {
        id: x.id,
        student_name: x.student_id?.first_name,
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
      field: "answer",
      headerName: "",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="100%"
            ml="auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={`${colors.greenAccent[600]}`}
            borderRadius="4px"
          >
            <Button
              onClick={() => handleMarkAsAnsweredClick(row)}
              variant="contained"
              color="primary"
            >
              Mark as Answered
            </Button>
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

  const handleConfirmMarkAsAnswered = async () => {
    try {
      // Handle the action, e.g., send an API request to mark the question as answered
      console.log("Marked as Answered: ", selectedRow);

      await axios.patch(QUESTION_URL + "/" + selectedRow.id, {
        answered_time: new Date(),
      });
      console.log("updated successfully");
      await getQuestionsData();

      // Set the success toast message and open the toast
      setToastMessage("Question marked as answered successfully");
      setIsToastOpen(true);
    } catch (error) {
      // Handle any errors here
      console.error("Error marking question as answered:", error);
    } finally {
      // Close the dialog
      setIsDialogOpen(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="Question Queue" subtitle="managing the questions"></Header>
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
          <Button onClick={handleConfirmMarkAsAnswered} color="primary">
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

export default QuestionQueue;
