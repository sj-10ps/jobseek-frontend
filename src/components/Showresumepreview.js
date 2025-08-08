import React from 'react'
import { useParams } from 'react-router-dom'
import Template1 from '../assets/templates/Template1'
import Template2 from '../assets/templates/Template2'
import Template3 from '../assets/templates/Template3'
import { useSelect } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const Showresumepreview = () => {
    const {no}=useParams()
    
  
    const {loading,profiledata,certificatedata,educationdata,experiencedata,skillsdata}=useSelector((state)=>state.userdetails)
  return (
    <>

{loading&&<>loading details....</>}
    {no==="1"&&<Template1 userData={profiledata} experiences={experiencedata} certifications={certificatedata} educations={educationdata} skills={skillsdata} />}
    {no==="2"&&<Template2 userData={profiledata} experiences={experiencedata} certifications={certificatedata} educations={educationdata} skills={skillsdata}/>}
     {no==="3"&&<Template3 userData={profiledata} experiences={experiencedata} certifications={certificatedata} educations={educationdata} skills={skillsdata}/>}
      
    </>
  )
}

export default Showresumepreview
