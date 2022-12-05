import React from "react";
import { Box, Typography, Divider, IconButton, Stack , Alert } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import UserCard from "./userCard";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

const SideBar = ({ setAuthedUser }) => {
    const token =localStorage.getItem('jwt')

  // after-fix: remove users
  const users = [
    { id: 1, firstName: "Azin", lastName: "Alahkhani" },
    { id: 2, firstName: "Ashkan", lastName: "MirzaHoseini" },
    { id: 3, firstName: "Ebrahim", lastName: "Alahkhani" },
    { id: 4, firstName: "Shirin", lastName: "Farhadi" },
    { id: 5, firstName: "Negin", lastName: "Alahkhani" },
  ];
  const {data,loading,error} =  useQuery(GET_USERS)
  if(error){
    console.log(error.message)
  }
  if(loading){
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box textAlign="center">
          {/* <CircularProgress /> */}
          <Typography variant="h6">.LOADING.</Typography>
        </Box>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        backgroundColor: "#dcedc8",
        height: "100vh",
        width: "250px",
        padding: "10px",
      }}
    >


      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
                  {error && <Alert severity="error">{error.message}</Alert>}

        <Typography color="primary.dark" variant="h6">
          chats
        </Typography>
        <IconButton
          edge="start"
          color="primary"
          sx={{ fontSize: 40 }}
          onClick={() => {
            localStorage.removeItem("jwt");
            setAuthedUser(false);
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Stack>
      <Divider />
   
      {data.users.map((item) => {
        return (
          <>
            <UserCard key={item.id} item={item} />
            <Divider variant="middle" />
          </>
        );
      })}
    </Box>
  );
};

export default SideBar;
