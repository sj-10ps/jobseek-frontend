import React from 'react'
import NavBar from '../components/Nav'
import Loginform from '../components/Loginform'
import '../css/homepage.css'
import { useLocation } from 'react-router-dom'
import UserReg from '../components/UserReg'
import Companyreg from '../components/Companyreg'
import Homecontent from '../components/Homecontent'
import Forgot from '../components/Forgotpage'

const Homepage = () => {
const location=useLocation()
const path=location.pathname
  return (
   <div className='main'>
    <header>
        <NavBar/>
    </header>
    <main className='content'>
      {path==='/' && <Homecontent />}
     {path==='/login' && <Loginform/>}
     {path==='/forgot' && <Forgot/>}
     {path==='/userregistration' && <UserReg/>}
     {path==='/companyreg' && <Companyreg/>}
     
      
       
    </main>

    </div>
  
  )
}

export default Homepage