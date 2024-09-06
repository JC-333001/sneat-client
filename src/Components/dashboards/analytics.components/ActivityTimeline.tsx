import React from "react";
import { Typography, Grid, Box, Avatar } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { styled } from "@mui/system";
import AvatarGroup from "@mui/material/AvatarGroup";

const CustomTimelineOppositeContent = styled(TimelineOppositeContent)({
  flex: 0, // Removes the space reserved for opposite content
  padding: 0, // Removes any default padding
});

const LeftAlignedTimeline = styled(Timeline)({
  alignItems: "flex-start", // Aligns the items to the start (left)
  height: "100%",
});

const CustomTimelineItem = styled(TimelineItem)({
  width: "100%",
  height: "30%",
});

const ActivityTimeline: React.FC = () => {
  return (
    <LeftAlignedTimeline>
      <Typography
        variant='h2'
        gutterBottom
        sx={{
          fontSize: "1.2rem",
          fontWeight: "500",
          color: "text.primary",
          textAlign: "left",
          position: "relative",
          top: "-5px",
          margin: "10px 0 10px 0",
        }}
      >
        Activity Timeline
      </Typography>
      <CustomTimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary' />
          <TimelineConnector />
        </TimelineSeparator>
        <CustomTimelineOppositeContent />
        <TimelineContent>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='body1' fontWeight='bold'>
              12 Invoices have been paid
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              12 min ago
            </Typography>
          </Box>
          <Typography variant='body2' color='textSecondary'>
            Invoices have been paid to the company
          </Typography>
          <Grid container alignItems='center' spacing={1}>
            <Grid item>
              <img
                width='24'
                height='24'
                alt='invoice.pdf'
                src='https://greakproject.vercel.app/images/icons/file-icons/pdf.png'
              />
            </Grid>
            <Grid item>
              <Typography variant='body2'>Invoices.pdf</Typography>
            </Grid>
          </Grid>
        </TimelineContent>
      </CustomTimelineItem>
      <CustomTimelineItem>
        <TimelineSeparator>
          <TimelineDot color='info' />
          <TimelineConnector />
        </TimelineSeparator>
        <CustomTimelineOppositeContent />
        <TimelineContent>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='body1' fontWeight='bold'>
              Client Meeting
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              45 min ago
            </Typography>
          </Box>
          <Typography variant='body2' color='textSecondary'>
            Project meeting with john @10:15am
          </Typography>
          <Grid container alignItems='center' spacing={1}>
            <Grid item>
              <Avatar
                alt='Steven Nash(Client)'
                src='https://greakproject.vercel.app/images/avatars/3.png'
              />
            </Grid>
            <Grid item>
              <Typography variant='body1'>Steven Nash(Client)</Typography>
              <Typography variant='body2'>CEO of ThemeSelection</Typography>
            </Grid>
          </Grid>
        </TimelineContent>
      </CustomTimelineItem>
      <CustomTimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: "#03C3EB" }} />
        </TimelineSeparator>
        <CustomTimelineOppositeContent />
        <TimelineContent>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='body1' fontWeight='500' color='text.primary'>
              Client Meeting
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              2 days ago
            </Typography>
          </Box>
          <Typography variant='body2' color='textSecondary'>
            4 team members in a project
          </Typography>
          <Grid container alignItems='center' spacing={1}>
            <Grid item>
              <AvatarGroup>
                <Avatar
                  alt='Remy Sharp'
                  src='	https://greakproject.vercel.app/images/avatars/5.png'
                />
                <Avatar
                  alt='Travis Howard'
                  src='https://greakproject.vercel.app/images/avatars/12.png'
                />
                <Avatar
                  alt='Cindy Baker'
                  src='	https://greakproject.vercel.app/images/avatars/9.png'
                />
                <Avatar
                  alt='Agnes Walker'
                  src='	https://greakproject.vercel.app/images/avatars/6.png'
                />
              </AvatarGroup>
            </Grid>
          </Grid>
        </TimelineContent>
      </CustomTimelineItem>
    </LeftAlignedTimeline>
  );
};

export default ActivityTimeline;
