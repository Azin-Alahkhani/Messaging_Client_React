import React from "react";
import { Stack, Typography } from "@mui/material";

function Welcome() {
  return (
    <Stack sx={{backgroundColor:"#aabb97"}} justifyContent="center" alignItems="center" flexGrow={1} >
      <Typography variant="h2" color="primary.dark"> welcome!</Typography>
    </Stack>
  );
}

export default Welcome;
