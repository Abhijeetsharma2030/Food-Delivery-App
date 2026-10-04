import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// keep the admin session across page reloads
const savedToken = localStorage.getItem('adminToken')
if (savedToken) {
  axios.defaults.headers.common['token'] = savedToken
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>


)
