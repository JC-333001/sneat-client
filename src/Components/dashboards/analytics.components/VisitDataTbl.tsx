import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import BrowserTbl from "./BrowserTbl.tsx";
import OSTbl from "./OSTbl.tsx";
import CountryTbl from "./CountryTbl.tsx";

export default function VisitDataTbl() {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        margin: "0",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          display: "flex",
          paddingLeft: "10px",
        }}
      >
        <Button
          onClick={() => {
            handleChange(0);
          }}
          sx={{
            color: value == 0 ? "white" : "text.secondary",
            bgcolor: value == 0 ? "primary.main" : "background.paper",
            "&:hover": {
              bgcolor: value == 0 ? "primary.main" : "primary.light",
            },
            marginRight: "5px",
          }}
        >
          BROWSER
        </Button>
        <Button
          onClick={() => {
            handleChange(1);
          }}
          sx={{
            color: value == 1 ? "white" : "text.secondary",
            bgcolor: value == 1 ? "primary.main" : "background.paper",
            "&:hover": {
              bgcolor: value == 1 ? "primary.main" : "primary.light",
            },
            marginRight: "5px",
          }}
        >
          OPERATING SYSTEM
        </Button>
        <Button
          onClick={() => {
            handleChange(2);
          }}
          sx={{
            color: value == 2 ? "white" : "text.secondary",
            bgcolor: value == 2 ? "primary.main" : "background.paper",
            "&:hover": {
              bgcolor: value == 2 ? "primary.main" : "primary.light",
            },
            marginRight: "5px",
          }}
        >
          COUNTRY
        </Button>
      </Box>
      {value == 0 ? <BrowserTbl /> : value == 1 ? <OSTbl /> : <CountryTbl />}
    </Box>
  );
}
