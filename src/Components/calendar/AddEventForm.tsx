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

interface EventFormProps {
  newEvent: {
    title: string;
    start: string;
    end: string;
    url: string;
    isRecurring: boolean;
    recurrence: string;
    recurrenceEnd: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRecurringChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFrequencyChange: (event: SelectChangeEvent<string>) => void;
  handleAddEvent: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  newEvent,
  handleInputChange,
  handleRecurringChange,
  handleFrequencyChange,
  handleAddEvent,
}) => {
  return (
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

      <FormControlLabel
        control={
          <Checkbox
            checked={newEvent.isRecurring}
            onChange={handleRecurringChange}
          />
        }
        label='Recurring Event'
      />

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
  );
};

export default EventForm;
