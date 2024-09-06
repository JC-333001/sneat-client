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
    country: "USA",
    visits: 87240,
    percentage: 38.12,
  },
  {
    country: "Brazil",
    visits: 42690,
    percentage: 28.23,
  },
  {
    country: "India",
    visits: 12580,
    percentage: 13.82,
  },
  {
    country: "Australia",
    visits: 4130,
    percentage: 12.72,
  },
  {
    country: "China",
    visits: 2210,
    percentage: 7.11,
  },
  {
    country: "France",
    visits: 1560,
    percentage: 6.59,
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

export default function CountryTbl() {
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
              key={row.country}
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
                    src={require(`../../../img/countries/${row.country.toLowerCase()}.png`)}
                    alt={row.country}
                  ></img>
                  <Typography marginLeft={"10px"}>{row.country}</Typography>
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
