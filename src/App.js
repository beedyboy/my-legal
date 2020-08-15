<<<<<<< HEAD
import React, { Fragment } from 'react'; 
=======
 import React, { Fragment } from 'react'; 
>>>>>>> origin/honey
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
function App() {
  return (
     <Fragment>
       <Router>
         <Routes />
       </Router>
     </Fragment>
  );
}

export default App;
