import React from 'react';
import './App.css';
import Forecast from "./Components/Forecast/Forecast";
import FiveDaysComponent from "./Components/Conditions/FiveDays/FiveDaysComponent";

function App() {
  return (
    <div className="App">
        <Forecast/>
        <FiveDaysComponent/>
    </div>
  );
}

export default App;
