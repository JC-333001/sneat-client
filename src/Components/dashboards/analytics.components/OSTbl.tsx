import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatCompactNumber } from "../../../utils/number.abbreviator.ts";
import { Box, Typography, Avatar } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const rows = [
  {
    system: "Windows",
    visits: 475260,
    percentage: 61.5,
  },
  {
    system: "Mac",
    visits: 89120,
    percentage: 15.67,
  },
  {
    system: "Ubuntu",
    visits: 38680,
    percentage: 5.82,
  },
  {
    system: "Linux",
    visits: 30270,
    percentage: 5.03,
  },
  {
    system: "Chrome",
    visits: 8340,
    percentage: 3.25,
  },
  {
    system: "Cent",
    visits: 2250,
    percentage: 1.76,
  },
];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  width: "50%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function OSTbl() {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ width: "100%" }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {/* <TableCell>Dessert (100g serving)</TableCell> */}
            <TableCell>NO.</TableCell>
            <TableCell align='left'>BROWSER</TableCell>
            <TableCell align='left'>VISITS</TableCell>
            <TableCell align='left'>DATA IN PERCENTAGE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.system}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell align='left'>
                <Box
                  display={"flex"}
                  justifyContent={"start"}
                  maxWidth={"100px"}
                  sx={{ flexWrap: "nowrap" }}
                >
                  <img
                    width='24'
                    height='24'
                    src={require(`../../../img/operating.systems/${row.system.toLowerCase()}.png`)}
                    alt={row.system}
                  ></img>
                  <Typography marginLeft={"10px"}>{row.system}</Typography>
                </Box>
              </TableCell>
              <TableCell align='left'>
                {formatCompactNumber(row.visits)}
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <BorderLinearProgress
                  variant='determinate'
                  value={row.percentage}
                />
                <Typography
                  marginLeft={"10px"}
                >{`${row.percentage}%`}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
