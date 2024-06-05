import logo from './logo.svg';
import './App.css';
import Signup from './components/signup.js';
import Login from './components/login.js';
import Home from "./components/home.js"
import About from "./components/about.js"
import Contact from "./components/contact.js"
import Feed from "./components/feed.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState} from "react"

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <>
    
      <Router>
        <Routes>
           <Route
            path="/"
            element={<Home />}
            ></Route>
         <Route
            path="/about"
            element={<About />}
          ></Route>
          <Route
            path="/contact"
            element={<Contact />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup />}
          ></Route>
          <Route
            path="/login"
            element={ <Login setIsLoggedIn={setIsLoggedIn} />}
          />

         
          <Route
            path="/feed"
            element={<Feed/>}
          >

          </Route>

        </Routes>
      </Router>

      
     

    </>

  );
}

export default App;
