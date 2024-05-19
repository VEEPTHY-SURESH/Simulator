import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import AddScenario from './components/AddScenario';
import AddVehicle from './components/AddVehicle';
import AllScenarios from './components/AllScenarios';
import AllVehicles from './components/AllVehicles';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/addscenario" element={<AddScenario />}></Route>
            <Route path="/addvehicle" element={<AddVehicle />}></Route>
            <Route path="/allscenarios" element={<AllScenarios />}></Route>
            <Route path="/allvehicles" element={<AllVehicles />}></Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
