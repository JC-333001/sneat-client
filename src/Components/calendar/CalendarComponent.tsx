import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule"; // Plugin for recurring events
import {
  Drawer,
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import "./calendarComponent.css";
import { createEvent, getEvents, updateEvents } from "../../api/calendar.api";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../../routes/Profile";
import { useNavigate } from "react-router-dom";

export interface CalendarEvent {
  title: string; // Event title
  start?: string; // Start time (ISO string)
  end?: string; // End time (ISO string)
  url?: string; // Optional: URL for meeting or event
  rrule?: {
    freq: "daily" | "weekly" | "monthly" | "yearly"; // Recurrence frequency
    interval?: number; // How often the event repeats (e.g., every 1 week)
    dtstart?: string; // Start date and time (ISO string)
    until?: string; // Recurrence end date (ISO string)
    count?: number; // Optional: Number of occurrences
    byweekday?: string[]; // Optional: Days of the week (e.g., ['mo', 'we'])
  };
}

const CalendarComponent = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    url: "",
    isRecurring: false,
    recurrence: "weekly",
    recurrenceEnd: "", // Field to store the end of the recurrence
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      if (!token) {
        navigate("/login");
        return;
      }
      const decoded = jwtDecode<User>(token);
      setUserId(decoded._id);
      let res = await getEvents(decoded._id);
      setEvents(res);
      // console.log("in useeffetc", res);
    }
    loadUserData();
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, isRecurring: e.target.checked });
  };

  const handleFrequencyChange = (event: SelectChangeEvent<string>) => {
    setNewEvent({ ...newEvent, recurrence: event.target.value });
  };

  // Handle form submission to add a new event
  const handleAddEvent = async () => {
    let updatedEvents: CalendarEvent[];
    if (newEvent.isRecurring) {
      // Add recurrence rule (rrule)
      updatedEvents = [
        ...events,
        {
          title: newEvent.title,
          rrule: {
            freq: newEvent.recurrence as
              | "daily"
              | "weekly"
              | "monthly"
              | "yearly", // Recurrence frequency
            interval: 1, // Recurrence interval
            dtstart: newEvent.start, // Start date and time
            until: newEvent.recurrenceEnd, // Recurrence end date
          },
          url: newEvent.url,
        },
      ];
    } else {
      // Non-recurring event
      updatedEvents = [
        ...events,
        {
          title: newEvent.title,
          start: newEvent.start,
          end: newEvent.end,
          url: newEvent.url,
        },
      ];
    }
    if (events) {
      try {
        console.log("in comp", updatedEvents);
        await updateEvents(updatedEvents, userId);
      } catch (e) {
        console.log("Fail to update events", e);
      }
    } else {
      try {
        console.log(updatedEvents);
        let res = await createEvent(updatedEvents, userId);
      } catch (e) {
        console.error("Fail to save events", e);
      }
    }
    setEvents(updatedEvents);

    setDrawerOpen(false); // Close the drawer after adding event
  };

  return (
    <div>
      {/* FullCalendar component with rrulePlugin for recurring events */}
      <div className='calendar_container'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, rrulePlugin]}
          initialView='dayGridMonth'
          events={events}
          customButtons={{
            addEvent: {
              text: "+ add event",
              click: function () {
                setDrawerOpen(true); // Directly set the drawer to open
                console.log("Click event triggered! Drawer Open:", drawerOpen);
              },
            },
          }}
          headerToolbar={{
            left: "title",
            center: "",
            right: "addEvent,prev,next,dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>

      {/* Drawer component for event form */}
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, padding: 2 }}>
          <h3>Add New Event</h3>
          <TextField
            label='Event Title'
            name='title'
            fullWidth
            margin='normal'
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <TextField
            label='Start Time'
            name='start'
            type='datetime-local'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            value={newEvent.start}
            onChange={handleInputChange}
          />
          <TextField
            label='End Time'
            name='end'
            type='datetime-local'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            value={newEvent.end}
            onChange={handleInputChange}
          />
          <TextField
            label='Meeting URL'
            name='url'
            fullWidth
            margin='normal'
            value={newEvent.url}
            onChange={handleInputChange}
          />

          {/* Recurring Event Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={newEvent.isRecurring}
                onChange={handleRecurringChange}
              />
            }
            label='Recurring Event'
          />

          {/* Dropdown for recurrence frequency */}
          {newEvent.isRecurring && (
            <>
              <Select
                label='Recurrence Frequency'
                value={newEvent.recurrence}
                onChange={handleFrequencyChange}
                fullWidth
                margin='dense'
              >
                <MenuItem value='daily'>Daily</MenuItem>
                <MenuItem value='weekly'>Weekly</MenuItem>
                <MenuItem value='monthly'>Monthly</MenuItem>
                <MenuItem value='yearly'>Yearly</MenuItem>
              </Select>

              {/* Recurrence End Date */}
              <TextField
                label='Recurrence End Date'
                name='recurrenceEnd'
                type='date'
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                value={newEvent.recurrenceEnd}
                onChange={handleInputChange}
              />
            </>
          )}

          <Button
            variant='contained'
            color='primary'
            onClick={handleAddEvent}
            style={{ marginTop: 20 }}
          >
            Save Event
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default CalendarComponent;
