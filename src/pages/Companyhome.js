import React from 'react'
import { Nav } from 'react-bootstrap'
import NavBar from '../components/Nav'
import Userhomecontents from '../components/Userhomecontents'
import Postcard from '../components/Postcard'
import Profileminicard from '../components/Profileminicard'
import UserProfile from '../components/Userprofile'
import Companyprofile from '../components/Companyprofile'
import { useLocation } from 'react-router-dom'
import Uploadjobs from '../components/Uploadjobs'
import Viewapplications from '../components/Viewapplications'
import Community from '../components/Community'
import Messaging from '../components/Messaging'
import Companyselecteduserstext from '../components/companyselectedusers'
import Feedback from 'react-bootstrap/esm/Feedback'
import Feedbackform from '../components/Feedback'

const Companyhome = () => {
  const location=useLocation().pathname
  return (
    <div className='d-flex flex-column'>
      <header style={{position:'sticky',top:0,zindex:4}}>
        <NavBar/>
      </header>
      <main className='d-flex flex-column' style={{maxHeight:'100vh',overflowY:'scroll',scrollbarWidth:'none'}}> 
        {location==="/companyhome"&&   <Companyprofile/>}
        {location==="/uploadjobs"&&<Uploadjobs/>}
          {location==="/viewapplications"&&<Viewapplications/>}
          {location==='/community'&&<Community/>}
        {location==='/companymessages'&&<Messaging/>}
        {location==='/selecteduserstext'&&<Companyselecteduserstext/>}
         {location==='/companyfeedback'&&<Feedbackform/>}
      </main>

    </div>
  )
}

export default Companyhome