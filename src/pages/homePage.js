import React from "react";
import {Route, Routes} from 'react-router-dom'
import { Box } from "@mui/material";

import SideBar from "../components/sideBar";
import Welcome from "../components/Welcome";
import ChatPage from "./ChatPage";

const AllRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={<Welcome />}></Route>
            <Route path='/:id/:name' element={<ChatPage />}></Route>
            {/* <Route path='/:id/:name/sharedInfo' element={<div />}></Route> */}
        </Routes>
    )
}



const HomePage = ({setAuthedUser}) => {
  // const token =localStorage.getItem('jwt')
  return (
    <Box  display="flex" direction="row">
      <SideBar setAuthedUser={setAuthedUser} />
      <AllRoutes />
      {/* <div>{token}</div> */}
    </Box>
  );
};

export default HomePage;
