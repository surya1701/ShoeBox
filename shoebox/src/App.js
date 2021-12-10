import React from 'react';
import './App.css';
import Home from './components/Home';
import Cart from './features/cart/Cart';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <Home />
    // </div>
    <div className="App">
    <Router>
      <Routes>
          <Route exact path ="/" element={<Home/>}/>
          <Route path ="/cart" element={<Cart/>}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
