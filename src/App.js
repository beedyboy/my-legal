import React, { Fragment } from 'react';  
import { HashRouter as Router } from "react-router-dom";
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
     <Fragment>
       <Router>
         <Routes />
       </Router>
       <ToastContainer />
     </Fragment>
  );
}

export default App;
