import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from "./Signup.tsx";
import Home from "./Home.tsx"
import Meowbar from "./Navbar.tsx";

function App() {
  return (
      <Router>
          <Meowbar/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
      </Router>
  )
}

export default App
