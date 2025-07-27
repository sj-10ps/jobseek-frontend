import React from 'react'
import NavBar from '../components/Nav'
import '../css/userhome.css'
import UserIntro from '../components/UserIntro'
import { useLocation } from 'react-router-dom'
import Userhomecontents from '../components/Userhomecontents'
import CommentsView from '../components/Comments'
import UserProfile from '../components/Userprofile'


const Userhome = () => {
  const pathname=useLocation().pathname
  return (
   <div className='main'>
     <header>
    <NavBar/>
     </header>
     <main style={{height:'100vh'}}>
      {pathname=="/userhome"&&<Userhomecontents/>}
     
       {pathname=="/userintro"&&<UserIntro/>}
       {pathname==="/userProfile"&&<UserProfile/>}
      
       
         
         
        
     </main>
   </div>
  )
}

export default Userhome