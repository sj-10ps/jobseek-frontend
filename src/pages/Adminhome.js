import React, { useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import NavBar from '../components/Nav'
import { useLocation } from 'react-router-dom'
import Adminintro from '../components/Adminintro'
import AdminViewallusers from '../components/AdminViewallusers'
import Adminviewallcompanies from '../components/Adminviewallcompanies'
import ViewAllcompanies from '../components/ViewAllcompanies'
import Viewcompanyrequests from '../components/Viewcompanyrequests'
import Viewfeedbacks from '../components/Viewfeedbacks'

const Adminhome = () => {
  const location=useLocation().pathname

  return (
   <div className='d-flex flex-column'>
    <div style={{position:'fixed',top:0,zIndex:1,width:'100%'}}>
       <NavBar/>
    </div>
    <div style={{height:'90vh',overflowY:'scroll',scrollbarWidth:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>
     

     {location==="/adminhome"&&<Adminintro/>}
     {location==="/adminviewallusers"&&<AdminViewallusers/>}
     {location==='/adminviewallcompanies'&&<Adminviewallcompanies/>}
     {location==="/viewcompanyrequests"&&<Viewcompanyrequests/>}
       {location==="/viewfeedbacks"&&<Viewfeedbacks/>}
   
    </div>

   </div>
      
  )
}

export default Adminhome