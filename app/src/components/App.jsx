import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar.jsx';

import '../styles/App.css';

function App() {
  useEffect(() => {
    axios.post('/test')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  });

  function googleLogin() {
    axios.get('/auth/exist')
      .then(res => {
        console.log(res.body, 'inside of googleLogin')
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <Navbar />
      {/* <button onClick={googleLogin}>Log In</button> */}
      <Router>
        <div className="App" />
      </Router>
    </div>
  );
}

export default App;
