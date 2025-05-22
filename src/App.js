import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import PillCalendar from './pages/PillCalendar/PillCalendar';
import HospitalMap from './pages/HospitalMap/HospitalMap';
import DiseaseInfo from './pages/DiseaseInfo/DiseaseInfo';
import AppLayout from './layout/AppLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <Routes>
      <Route path="/" elements={<AppLayout/>}>
        {/* <Route index element={<Homepage/>}/> */}
        <Route index element={<HospitalMap/>}/>
        <Route path="/calendar" element={<PillCalendar/>}/>
        <Route path="/map" element={<HospitalMap/>}/>
        <Route path="/info" element={<DiseaseInfo/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
