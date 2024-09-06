import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CustomerRating from "../Components/dashboards/crm.components/CustomerRating.tsx";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "background.paper",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Crm() {
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     navigate("/dashboard/crm");
  //   }, []);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Item>
            <CustomerRating />
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
