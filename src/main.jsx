import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalContext from "./context/GlobalContext.jsx";
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import $ from 'jquery';
ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalContext>


)
