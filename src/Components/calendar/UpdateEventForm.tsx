import React from "react";
import {
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";

interface UpdateEventFormProps {
  event: {
    title: string;
    start: string;
    end: string;
    url: string;
    isRecurring: boolean;
    recurrence: string;
    recurrenceEnd: string;
    groupId: string;
  };
  handleUpdateInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateRecurringChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateFrequencyChange: (event: SelectChangeEvent<string>) => void;
  handleUpdateEvent: () => void;
  handleDeleteEvent: () => void;
}

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({
  event,
  handleUpdateInputChange,
  handleUpdateRecurringChange,
  handleUpdateFrequencyChange,
  handleUpdateEvent,
  handleDeleteEvent,
}) => {
  //   console.log("event", event);
  return (
    <Box sx={{ width: 300, padding: 2 }}>
      <h3>Update Event</h3>
      <TextField
        label='Event Title'
        name='title'
        fullWidth
        margin='normal'
        value={event.title}
        onChange={handleUpdateInputChange}
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
        value={event.start}
        onChange={handleUpdateInputChange}
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
        value={event.end}
        onChange={handleUpdateInputChange}
      />
      <TextField
        label='Meeting URL'
        name='url'
        fullWidth
        margin='normal'
        value={event.url}
        onChange={handleUpdateInputChange}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={event.isRecurring}
            onChange={handleUpdateRecurringChange}
          />
        }
        label='Recurring Event'
      />

      {event.isRecurring && (
        <>
          <Select
            label='Recurrence Frequency'
            value={event.recurrence}
            onChange={handleUpdateFrequencyChange}
            fullWidth
            margin='dense'
          >
            <MenuItem value='daily'>Daily</MenuItem>
            <MenuItem value='weekly'>Weekly</MenuItem>
            <MenuItem value='monthly'>Monthly</MenuItem>
            <MenuItem value='yearly'>Yearly</MenuItem>
          </Select>

          <TextField
            label='Recurrence End Date'
            name='recurrenceEnd'
            type='date'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            value={event.recurrenceEnd}
            onChange={handleUpdateInputChange}
          />
        </>
      )}

      <Button
        variant='contained'
        color='primary'
        onClick={handleUpdateEvent}
        style={{ marginTop: 20, marginRight: 10 }}
      >
        Update Event
      </Button>
      <Button
        variant='contained'
        color='error'
        onClick={handleDeleteEvent}
        style={{ marginTop: 20 }}
      >
        Delete Event
      </Button>
    </Box>
  );
};

export default UpdateEventForm;
