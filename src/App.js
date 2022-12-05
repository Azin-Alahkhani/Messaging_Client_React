
import { useState } from 'react';
import './App.css';

import AuthScreen from './pages/AuthScreen';
import HomePage from './pages/homePage';


function App() {
  //  localStorage.removeItem("jwt");
  const [authedUser,setAuthedUser] = useState(false)
  return (
    <>
    {authedUser ? <HomePage setAuthedUser={setAuthedUser} />  :  <AuthScreen setAuthedUser={setAuthedUser} /> }
      
    {/* <HomePage setAuthedUser={setAuthedUser} /> */}
    </>
  );
}

export default App;
