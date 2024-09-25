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
import AddEventForm from "./AddEventForm.tsx";
import UpdateEventForm from "./UpdateEventForm.tsx";

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
  groupId?: string;
}

const CalendarComponent = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [eventDrawerOpen, setEventDrawerOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    url: "",
    isRecurring: false,
    recurrence: "weekly",
    recurrenceEnd: "", // Field to store the end of the recurrence
    groupId: "",
  });
  const [selectedEvent, setSelectedEvent] = useState({
    title: "",
    start: "",
    end: "",
    url: "",
    isRecurring: false,
    recurrence: "weekly",
    recurrenceEnd: "", // Field to store the end of the recurrence
    groupId: "",
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
    }
    loadUserData();
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleEventDrawer = (open: boolean) => () => {
    setEventDrawerOpen(open);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleUpdateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, isRecurring: e.target.checked });
  };

  const handleUpdateRecurringChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedEvent({ ...selectedEvent, isRecurring: e.target.checked });
  };

  const handleFrequencyChange = (event: SelectChangeEvent<string>) => {
    setNewEvent({ ...newEvent, recurrence: event.target.value });
  };

  const handleUpdateFrequencyChange = (event: SelectChangeEvent<string>) => {
    setSelectedEvent({ ...selectedEvent, recurrence: event.target.value });
  };

  const createOrUpdateEvent = (
    existingEvents: CalendarEvent[],
    eventData: {
      title: string;
      start: string;
      end: string;
      url: string;
      isRecurring: boolean;
      recurrence: string;
      recurrenceEnd: string;
      groupId?: string;
    }
  ): CalendarEvent[] => {
    const newEvent: CalendarEvent = eventData.isRecurring
      ? {
          title: eventData.title,
          rrule: {
            freq: eventData.recurrence as
              | "daily"
              | "weekly"
              | "monthly"
              | "yearly",
            interval: 1,
            dtstart: eventData.start,
            until: eventData.recurrenceEnd,
          },
          url: eventData.url,
          groupId:
            eventData.groupId || (existingEvents?.length ?? 0).toString(),
        }
      : {
          title: eventData.title,
          start: eventData.start,
          end: eventData.end,
          url: eventData.url,
          groupId:
            eventData.groupId || (existingEvents?.length ?? 0).toString(),
        };

    return existingEvents
      ? eventData.groupId
        ? existingEvents.map((event) =>
            event.groupId === eventData.groupId ? newEvent : event
          )
        : [...existingEvents, newEvent]
      : [newEvent];
  };

  // Handle form submission to add a new event
  const handleAddEvent = async () => {
    let updatedEvents: CalendarEvent[];

    updatedEvents = createOrUpdateEvent(events, newEvent);
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

  const handleUpdateEvent = async () => {
    let updatedEvents: CalendarEvent[];
    updatedEvents = createOrUpdateEvent(events, selectedEvent);

    try {
      console.log("in comp", updatedEvents);
      await updateEvents(updatedEvents, userId);
    } catch (e) {
      console.log("Fail to update events", e);
    }

    setEvents(updatedEvents);
    setEventDrawerOpen(false);
  };

  const handleDeleteEvent = async () => {
    let updatedEvents: CalendarEvent[];
    try {
      updatedEvents = events.filter(
        (event) => event.groupId !== selectedEvent.groupId
      );
      await updateEvents(updatedEvents, userId);
    } catch (e) {
      console.log("Fail to delete event", e);
    }
    setEvents(
      events.filter((event) => event.groupId !== selectedEvent.groupId)
    );
    setEventDrawerOpen(false);
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
              },
            },
          }}
          headerToolbar={{
            left: "title",
            center: "",
            right: "addEvent,prev,next,dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={(info) => {
            let eventInfo = events.find(
              (event) => event.groupId === info.event._def.groupId
            );
            if (eventInfo) {
              setSelectedEvent({
                title: eventInfo?.title ?? "",
                start: eventInfo?.start ?? "",
                end: eventInfo?.end ?? "",
                url: eventInfo?.url ?? "",
                isRecurring: !!eventInfo?.rrule,
                recurrence: eventInfo?.rrule?.freq ?? "weekly",
                recurrenceEnd: eventInfo?.rrule?.until ?? "",
                groupId: eventInfo?.groupId ?? "",
              });
              setEventDrawerOpen(true);
            }
          }}
        />
      </div>

      {/* Drawer component for add event form */}
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        <AddEventForm
          newEvent={newEvent}
          handleInputChange={handleInputChange}
          handleRecurringChange={handleRecurringChange}
          handleFrequencyChange={handleFrequencyChange}
          handleAddEvent={handleAddEvent}
        />
      </Drawer>
      {/* Drawer component for update event form */}
      <Drawer
        anchor='right'
        open={eventDrawerOpen}
        onClose={toggleEventDrawer(false)}
      >
        <UpdateEventForm
          event={selectedEvent}
          handleUpdateInputChange={handleUpdateInputChange}
          handleUpdateRecurringChange={handleUpdateRecurringChange}
          handleUpdateFrequencyChange={handleUpdateFrequencyChange}
          handleUpdateEvent={handleUpdateEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Drawer>
    </div>
  );
};

export default CalendarComponent;
