import React, { Fragment } from 'react';
import ReactDOM from 'react-dom'; 
// import { hydrate, render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-fancybox/lib/fancybox.css'
import 'font-awesome/css/font-awesome.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';  
import App from './App';
import * as serviceWorker from './serviceWorker'; 
// const rootElement = document.getElementById("root");

ReactDOM.render( 
  <Fragment> 
     <App />
  </Fragment>,
 document.getElementById('root')
);
 
// if (rootElement.hasChildNodes()) {
//   hydrate(<App />, rootElement);
// } else {
//   render(<App />, rootElement);
// }
serviceWorker.unregister();
