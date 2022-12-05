import React, { useRef, useState, useParams } from "react";
import { TextField, Stack } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../graphql/mutations";

function ChatBar({id,setNewMessage}) {

  id = parseInt(id)
  // console.log(id+"  "+typeof(id))

  const [text, setText] = useState("");
  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE, 
    {onCompleted(data){
    setNewMessage(data.sendmessage)
    setText("")
  }});

  const handleSendClick = () => {
    if(!loading)
 { 
    sendMessage({
      variables: {
        recieverId: id,
        text,
      }
    });}
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ backgroundColor: "#a4a4a4" }}
    >
      <TextField
        name="text"
        placeholder="write a new message..."
        fullWidth
        multiline
        variant="filled"
        rows={2}
        autoComplete="off"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <SendRoundedIcon
        color="secondary.dark"
        sx={{ fontSize: "40px" }}
        onClick={handleSendClick }
      />
    </Stack>
  );
}

export default ChatBar;
