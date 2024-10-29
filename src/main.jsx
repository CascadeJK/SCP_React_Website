// Imports the necessary hooks and modules from React and react-router-dom
import React from 'react'
import ReactDOM from 'react-dom/client'
// Imports the App component (The root component of the app)
import App from './App.jsx'

// Creates a root element in the DOM and displays the App component inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wraps the App component in React.StrictMode to activate additional checks and warnings in development
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
