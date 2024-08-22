import { useState } from 'react'
import './App.css'
import AddWorkshop from './components/AddWorkshop/AddWorkshop'
import UpdateWorkshop from './components/UpdateWorkshop/UpdateWorkshop'
import DeleteWorkshop from './components/deleteWorkshop/deleteWorkshop'
import {BrowserRouter as Router ,Routes ,Route} from 'react-router-dom';
import Login from './components/Login/Login'
import { WorkshopProvider } from './components/Context/workshopContext';
import DeleteCard from './components/DeleteCard/DeleteCard'

function App() {

  return (
    <>

  <Router>
  <WorkshopProvider>

    <Routes>
      <Route  path='/' element={<Login/>}/>
      <Route  path='/deleteworkshop' element={<DeleteWorkshop/>}/>
      <Route  path='/updateworkshop' element={<UpdateWorkshop/>}/>
      <Route  path='/addworkshop' element={<AddWorkshop/>}/>
      <Route  path='/deleteworkshop/:workshopname' element={<DeleteCard/>}/>

    </Routes>
    </WorkshopProvider>

  </Router>
    </>
  )
}

export default App
