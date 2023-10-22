import React, { useState } from 'react';
import { Box, useTheme, Button } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from '../../api/axios';
import ConfirmationDialog from './../../components/confirmation-dialog';
import { useSessionID } from './../../sessionIdProvider';

const AskQuestion = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({});
  const { sessionId } = useSessionID(); // Access the session ID from the context

  // State variable for confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleClick = () => {
    console.log(data);

    // Check if a session is selected
    if (sessionId === null) {
      // Set the confirmation message
      setConfirmationMessage('Please select a session before asking a question.');
      // Open the confirmation dialog
      setIsDialogOpen(true);
      return;
    }

    // Handle the question submission with the selected session ID
    const postData = {
      session_id: sessionId, // Use the session ID from the context
      student_id: 'f4edde66-8c68-416f-bd1b-b54e37c0d1fb',
    };

    axios
      .post('/items/Question', postData)
      .then((response) => {
        // Handle the response from the server
        setData(response.data);
        alert('Added in the Queue!');
      })
      .catch((error) => {
        // Handle any errors
        alert('An error occurred.');
        console.error(error);
      });
  };

  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Box m="20px">
      <Header title="Ask a Question" subtitle="Press the button to get in the queue." />
      <Box style={centerStyle}>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ backgroundColor: `${colors.blueAccent[400]}`, width: '250px', height: '80px' }}
        >
          Click Me
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => setIsDialogOpen(false)}
        message={confirmationMessage}
      />
    </Box>
  );
};

export default AskQuestion;