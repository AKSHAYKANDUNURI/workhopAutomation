import './App.css'
import AddWorkshop from './components/AddWorkshop/AddWorkshop'
import UpdateWorkshop from './components/UpdateWorkshop/UpdateWorkshop'
import DeleteWorkshop from './components/DeleteWorkshop/DeleteWorkshop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import { WorkshopProvider } from './components/Context/workshopContext';
import DeleteCard from './components/DeleteCard/DeleteCard'
import StudentHome from './components/studentHome/studentHome'
import RegisterWorkshop from './components/RegisterWorkshop/RegisterWorkshop'
import UpdateCard from './components/UpdateCard/UpdateCard';

function App() {
  return (
    <>
      <Router>
        <WorkshopProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/deleteworkshop' element={<DeleteWorkshop />} />
            <Route path='/updateworkshop' element={<UpdateWorkshop />} />
            <Route path='/addworkshop' element={<AddWorkshop />} />
            <Route path='/deleteworkshop/:workshopname' element={<DeleteCard />} />
            <Route path='/updateworkshop/:workshopname' element={<UpdateCard />} />
            <Route path='/studenthome' element={<StudentHome />}/>
            <Route path='/studenthome/registerworkshop' element={<RegisterWorkshop />} />
            
            
          </Routes>
        </WorkshopProvider>
      </Router>
    </>
  )
}

export default App
