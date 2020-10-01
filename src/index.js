import React, { Fragment } from 'react';
// import ReactDOM from 'react-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-fancybox/lib/fancybox.css'
import 'font-awesome/css/font-awesome.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css'; 
import { render } from 'react-snapshot';
import App from './App';
import * as serviceWorker from './serviceWorker'; 

render( 
   <Fragment> 
      <App />
   </Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
