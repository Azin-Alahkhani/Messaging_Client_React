import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Box, Typography, Stack, Button, TextField, Card, CircularProgress,Alert,} from "@mui/material";
import { SIGNUP_USER, SIGNIN_USER } from "../graphql/mutations";
import '../App.css'


const AuthScreen = ({setAuthedUser}) => {

  const [loginShow, setLoginShow] = useState(true);
  const [formData, setFormData] = useState({});

  const authForm = useRef(null);

  const [signupUser, { data: SignupData, loading: load1, error: err1 }] =
    useMutation(SIGNUP_USER);
    
  const [signinUser, { data: SigninData, loading: load2, error: err2 }] =
    useMutation(SIGNIN_USER,{onCompleted(data){
      localStorage.setItem('jwt',data.signin.token)
      
      setAuthedUser(true)
    }});
  
  if (load1 || load2) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Authenticating...</Typography>
        </Box>
      </Box>
    );
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
    if (loginShow) { signinUser({variables: { user: formData }})} 
    else { signupUser({variables: { newUser: formData,}}); }
  };

  return (
    <Box
      ref={authForm}
      component="form"
      onSubmit={submitForm}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card
        variant="outlined"
        sx={{
          padding: "10px",
          backgroundColor: "#aabb97",
          boxShadow: "2px 2px",
        }}
      >
        <Stack sx={{ width: "400px" }} direction="column" spacing={2}>
          {SignupData && (
            <Alert severity="success">
              {SignupData.signup.firstName}, you successfully signed up!{" "}
            </Alert>
          )}
          {err1 && <Alert severity="error">{err1.message}</Alert>}
          {err2 && <Alert severity="error">{err2.message}</Alert>}
          <Typography variant="h5" color="text.secondary">
            {loginShow ? "Log in" : "Sign up"}
          </Typography>
          {!loginShow && (
            <>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                onChange={handleChange} //e is automatically sent to function by react
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                onChange={handleChange}
                required
              />
            </>
          )}

          <TextField
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <Typography
          className="hover"
            textAlign="center"
            variant="subtitle2"
            color="text.secondary"
            onClick={() => {
              setLoginShow((preValue) => !preValue);
              setFormData({});
              authForm.current.reset();
            }}
          >
            {loginShow ? "Sign up here" : "Log in here"}
          </Typography>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthScreen;
