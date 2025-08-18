import React from 'react'
import NavBar from '../components/Nav'
import '../css/userhome.css'
import UserIntro from '../components/UserIntro'
import { useLocation } from 'react-router-dom'
import Userhomecontents from '../components/Userhomecontents'
import CommentsView from '../components/Comments'
import UserProfile from '../components/Userprofile'
import Showresumetemplates from '../components/Showresumetemplates'
import Showresumepreview from '../components/Showresumepreview'
import ViewallUsers from '../components/ViewallUsers'
import ViewAllcompanies from '../components/ViewAllcompanies'
import Alljobs from '../components/Alljobs'
import Community from '../components/Community'
import Messaging from '../components/Messaging'
import Feedback from 'react-bootstrap/esm/Feedback'
import Feedbackform from '../components/Feedback'


const Userhome = () => {
  const pathname=useLocation().pathname
  return (
   <div className='main'>
     <header>
    <NavBar/>
     </header>
     <main className='content'>
      {pathname==="/userhome"&&<Userhomecontents/>}
     
       {pathname==="/userintro"&&<UserIntro/>}
       {pathname.startsWith("/userProfile")&&<UserProfile/>}
      
       {pathname==="/resumetemplates" && <Showresumetemplates/>}
       {pathname.startsWith('/Showresumepreview/')&& <Showresumepreview/>}
        {pathname.startsWith('/viewallusers')&&<ViewallUsers/>}
   
        {pathname.startsWith('/companyprofile')&&<ViewAllcompanies/>}
         {pathname.startsWith('/alljobs')&&<Alljobs/>}
         {pathname.startsWith('/usercommunity')&&<Community/>}
         {pathname==='/messaging'&&<Messaging/>}
          {pathname==='/userfeedback'&&<Feedbackform  />}
         

         
        
     </main>
   </div>
  )
}

export default Userhome