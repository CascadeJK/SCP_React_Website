// Imports BrowserRouter from react-router-dom so routes can be used
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Imports components
import NavMenu from './components/NavMenu';
import ItemDetail from './components/ItemDetail';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header'
// Imports the css
import './components/App.css'

// Main App component, which is the root component of the application
function App() {

  return (
    // Router allows routing functionality, like links.
    <Router>
      {/* Includes the navigation menu at the top of the app */}
      <NavMenu />
      {/* Defines the different links in the app */}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/" element={ <img src="../images/Hompage_img.png" className="Homepage" alt="Hompage_image"/>} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

// export the App componint as default export. Allows it to be imported
export default App
