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
import RecipeDetail from './components/RecipeDetail.js';
import CreateRecipe from './components/CreateRecipe.js';
import UpdateRecipe from './components/UpdateRecipie.js';
import SearchRecipies from './components/searchRecipies.js';
import Navbar from './components/Navbar.js';
import SavedRecipies from './components/SavedRecipies.js';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
    
      <Router>
        <Navbar onSearch={handleSearch} />
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

        <Route path="/recipes/:id" element={<RecipeDetail/>} >
        </Route>
          <Route
            path="/feed"
            element={<Feed/>}
          >

          </Route>
          <Route path="/create-recipe" element={<CreateRecipe/>} />
          <Route path="/recipes/:id/update" element={<UpdateRecipe/>} ></Route>
          <Route path="/searchRecipies"
           element={<SearchRecipies searchQuery={searchQuery} />}>
          </Route>
          <Route path="/savedRecipies"
           element={<SavedRecipies />}>
          </Route>
        </Routes>
      </Router>

      
     

    </>

  );
}

export default App;
