import React from 'react';
import background from './assets/imgs/ashoc-bg.png'
import header from './assets/imgs/ashoc-header.png'
import './App.css';
import SwipeViewModal from "./SwipeViewModal";


function App() {
  return (
    <div className="App">
        <img src={header} className="" alt="logo" />
        <img src={background} className="" alt="logo" />
        <SwipeViewModal />
    </div>
  );
}

export default App;
