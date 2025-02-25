import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Header} from "./components/Header";
import {Home} from "./components/Home";
import {EquipmentList} from "./components/EquipmentList.js";
import {WorkoutRecommendations} from "./components/WorkoutRecommendations";
import './App.css';

function App() {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route exact path="/" element={<Home/>}/>

        <Route path="/equipment-list" element={<EquipmentList/>}/>
        
        <Route path="/workout-recommendations" element={<WorkoutRecommendations/>}/>
      </Routes>
    </Router>
  )
}

export default App;
