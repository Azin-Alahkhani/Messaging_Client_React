import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Avatar, Typography } from "@mui/material";

function UserCard({ item: { firstName, lastName, id } }) {
    const navigate = useNavigate()
  return (
    <Stack
     className="userCard" 
     direction="row" 
     spacing={2} 
     sx={{ py: 1 }} 
     onClick={()=> navigate(`/${id}/${firstName} ${lastName}`)}>
      <Avatar
        src={`https://avatars.dicebear.com/api/big-ears-neutral/${firstName} ${lastName}.svg`}
        sx={{ width: "32px", height: "32px" }}
      />
      <Typography color="primary" variant="subtitle2">
        {firstName} {lastName}
      </Typography>
    </Stack>
  );
}

export default UserCard;
