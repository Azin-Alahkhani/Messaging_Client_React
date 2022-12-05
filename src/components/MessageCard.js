import React from "react";
import { Box, Typography } from "@mui/material";
import { padding } from "@mui/system";
//
function MessageCard({ text, date, direction }) {
  // direction is either start(for recieved messages) or end(for sent messages)
  return (
    <Box display="flex" justifyContent={direction}>
      <Box
        sx={{
          backgroundColor: "#757575",
          margin: "10px",
          borderRadius: "10px",
          boxShadow: "2px 2px 1px ",
          maxWidth: "50vh",
        }}
      >
        <Typography variant="subtitle2" padding="10px" color="text.primary">
          {text}
        </Typography>
        <Typography variant="caption" padding="10px">
          {new Date(date).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default MessageCard;
