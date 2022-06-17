import React from 'react';
import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Clip from './Clip/Clip';
import Main from './Main/Main'
import ErrorPage from './Navi/ErrorPage'
import { useSelector } from 'react-redux';

function App() {
  return (
    <>   
    <Routes>
     <Route path='/' element={<Main/>} />
     <Route path='/clip' element={<Clip/>} />
     <Route path='*' element={ <Navigate to="/" /> } />
    </Routes>
   </>

  );
}

export default App;
