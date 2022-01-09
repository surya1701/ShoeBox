import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './features/home/Home';
import Cart from './features/cart/Cart';
import Explore from './features/explore/Explore';
import Checkout from './features/checkout/Checkout';
import Confirmation from './features/checkout/Confirmation';
import ProductDemo from './features/product/ProductDemo';
import Profile from './features/Profile/Profile'
import { store } from "./app/store";

import ExploreByName from './features/explore/ExploreByName';

/*App.js - App component is the main component rendered in index.html using index.js 
All the route links are rendered in app component, using Route component of react-router-dom library*/

function App() {
  const [brands, setBrands] = useState(null)
  const url = "http://localhost:3001/brands"; // Mock backend API to fetch brands

  useEffect(() => {
    fetch("http://localhost:3001/shoes")
      .then(res => res.json())
      .then(result => {
        if (result) {
          store.dispatch({ type: 'LOAD_DATA', payload: { shoes: [...result] } }); // changing state of shoes
          store.dispatch({ type: 'LOAD_DATA_EXPLORE', payload: { shoes: [...result] } }) // changing state of explore items
        }
      })
    fetch(url)
      .then(resp => resp.json())
      .then(data => { setBrands(data) })
  }, [url])
  return (
    <div className="App" style={{ backgroundColor: "#fffdd0" }}>
      {(brands) ?
        <Router>
          <Routes>
            <Route exact path="/" element={<Home brands={brands} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/explore" element={<Explore brands={brands} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/product" element={<ProductDemo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/brand/:value" element={<ExploreByName brands={brands.map((b) => b.name)} />} />
          </Routes>
        </Router> : <p></p>
      }
    </div>
  );
}

export default App;


