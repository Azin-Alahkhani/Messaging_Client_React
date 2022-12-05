import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Avatar,
  TextField,
  Badge,
  Stack,
} from "@mui/material";
import UndoSharpIcon from "@mui/icons-material/UndoSharp";
import MessageCard from "../components/MessageCard";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USER_SPECIFIED_MESSAGES } from "../graphql/queries";
import ChatBar from "../components/chatBar";
import { MESSAGE_SUB } from "../graphql/subscriptions";

function ChatPage() {
  const { id, name } = useParams();
  console.log("id on chatpage"+ id)

 const [messages,setMessages] = useState([])
 const [newMessage,setNewMessage] = useState()

  const { data, loading, error } = useQuery(GET_USER_SPECIFIED_MESSAGES, {
    variables: { recieverId: parseInt(id) },
    onCompleted(data) {setMessages(data.allMessagesByUser)}
  });
  if (error) console.log(error.message);
  
  const {data:subData} = useSubscription(MESSAGE_SUB,
    {onSubscriptionData({subscriptionData:{data}}){
      setMessages((preMsgs) => [...preMsgs,data.messageAdded])
  }})

  if (subData) console.log(subData);


  const messagesEndRef = React.useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <Box flexGrow={1}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            sx={{ mr: 2 }}
          >
            {/* badgeContent={unreadMessageCount} */}
            <Badge  color="primary">
              <UndoSharpIcon  />
            </Badge>
          </IconButton>
          <Typography
            variant="h6"
            color="text.primary"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Messages
          </Typography>
          <Typography variant="caption" color="text.primary">
            {name}
          </Typography>
          <IconButton>
            <Avatar
              src={`https://avatars.dicebear.com/api/big-ears-neutral/${name}.svg`}
              sx={{ width: "32px", height: "32px", padding: "2px" }}
              // onClick={navigate(`/${id}/${name}/sharedinfo`)}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundColor: "#aabb97",
          height: "30rem",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        {/* { !loading && data.allMessagesByUser.map((item) => { */}
        { !loading && messages.map((item) => {
          return (
            <MessageCard
              text={item.text}
              date={item.sentAt}
              direction={(item.senderId == id) ? "start" : "end" }
            />
          );
        })}

        {/* ref="messagesEndRef" */}
        <div ref={messagesEndRef} />
      </Box>
      
      <ChatBar id={id} setNewMessage={setNewMessage}/>
    </Box>
  );
}

export default ChatPage;


