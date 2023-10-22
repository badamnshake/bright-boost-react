import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "../../api/axios";
import { useSessionID } from "../../sessionIdProvider";
import ConfirmationDialog from "../../components/confirmation-dialog";

const SESSION_URL =
  "/items/Session?fields=*,teacher_id.first_name,subject_id.name";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  // Access the session ID using the useSessionID hook
  const { sessionId, setSessionId } = useSessionID();

  // State variable for the confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Confirmation message for the dialog
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const getSessionData = async () => {
    try {
      const response = await axios.get(SESSION_URL, {
        params: {
          session_id: sessionId, // Use the session ID from the context
        },
      });

      const apiData = response?.data?.data;

      // Filter and transform API data into FullCalendar events
      const transformedEvents = apiData
        .filter((eventData) => new Date(eventData.start_time) > new Date()) // Filter only upcoming events
        .map((eventData) => ({
          id: eventData.id,
          title: `Session with ${eventData.teacher_id.first_name}`,
          start: new Date(eventData.start_time).toISOString(),
          end: new Date(eventData.end_time).toISOString(),
        }));

      // Set the transformed events in the state
      setCurrentEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching data from the API: ", error);
    }
  };

  useEffect(() => {
    getSessionData();
  }, [sessionId]); // Listen for changes to the session ID

  const handleEventClick = (sessionId) => {
    // Set the confirmation message
    setConfirmationMessage("Are you sure you want to select this session?");

    // Open the confirmation dialog
    setIsDialogOpen(true);

    // Set the selected session ID
    setSessionId(sessionId); // Update the session ID in the context
  };

  const handleConfirm = () => {
    // Close the confirmation dialog
    setIsDialogOpen(false);

    // Handle the confirmation logic here, for example, set the selected session ID
    if (sessionId !== null) {
      console.log("Selected session ID:", sessionId);
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Please select a session from the upcoming events" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Upcoming Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                  cursor: "pointer", // Add a cursor pointer for click
                }}
                onClick={() => handleEventClick(event.id)}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {new Date(event.start).toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            events={currentEvents} // Use the events property to bind the data
          />
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        message={confirmationMessage}
      />
    </Box>
  );
};

export default Calendar;
