import './App.css';
import background from './assets/imgs/background.png'

import React from 'react';
import SwipeViewModal from "./SwipeViewModal";

function App() {
  return (
      <div>
        <img src={background} className="" alt="logo" />
        <SwipeViewModal />
      </div>
  );
}

export default App;
