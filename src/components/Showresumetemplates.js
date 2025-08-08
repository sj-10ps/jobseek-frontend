import React from 'react'
import template1 from '../assets/images/template1.png'
import template2 from '../assets/images/template2.png'
import template3 from '../assets/images/template3.png'
import '../css/showresume.css'
import { useNavigate } from 'react-router-dom'

const Showresumetemplates = () => {
    const navigate=useNavigate()
    const handleclick=(no)=>{

       navigate(`/Showresumepreview/${no}`)
    }
  return (
 
    <div className='d-flex flex-column'>
    <h2 style={{textAlign:'center'}}>Choose A Template</h2>
    <div className='d-flex gap-4 mt-2 flex-wrap '>
     <div onClick={()=>handleclick(1)} style={{height:'450px',width:'350px',display:'flex',justifyContent:'center',alignItems:'center'}} className='temp'><img src={template1} style={{height:'400px',width:'300px'}}></img></div>     
     <div onClick={()=>handleclick(2)} style={{height:'450px',width:'350px',display:'flex',justifyContent:'center',alignItems:'center'}} className='temp'><img src={template2} style={{height:'400px',width:'300px'}}></img></div>  
     <div onClick={()=>handleclick(3)}  style={{height:'450px',width:'350px',display:'flex',justifyContent:'center',alignItems:'center'}} className='temp'><img src={template3} style={{height:'400px',width:'300px'}}></img></div>  
    </div>
    </div>
   
  )
}



export default Showresumetemplates
