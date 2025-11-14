// src/ResumeTemplate.jsx (updated)

import React, { useEffect } from 'react';
import '../../css/ModernMinimalistResume.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetails } from '../../redux/Personaldetailsslice';
import { Button, Spinner } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { uploadcustomresume } from '../../redux/uploadcustomresumeSlice';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Template1 = ({ userData, experiences, educations, certifications, skills }) => {
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(fetchdetails(localStorage.getItem("userid")))
    },[dispatch])
    console.log(userData)
    
 

  const {
    firstname = "Add name",
    lastname="",
    professionaltitle = "Add professional title",
    phone = "add phone no.",  
    email = "add email",
    district = "add district",
    state = "add state",
    summary = "add professional summary",
    linkedin="add linkedin link"
  } = userData || {};



    const {loading,success}=useSelector((state)=>state.uploadcustom)
   const navigate=useNavigate()
  const saveresume=async()=>{

  


      // 1. Select the resume section from the DOM using class name
    const input=document.querySelector('.resume-page-wrapper')
    if(!input) return;


      // 3. Convert the selected HTML element to a canvas (image of the DOM)
  // `scale: 2` makes the image high-resolution (2x zoom)
    const canvas=await html2canvas(input,{scale:1})

      // 4. Convert the canvas to image data in base64 format (PNG image)
      const imgdata=canvas.toDataURL('image/png')

      // 5. Create a new PDF instance (portrait, millimeters, A4 size)
        const pdf=new jsPDF("p","mm","a4")

      // 6. Get image dimensions and calculate proper aspect ratio for A4
          const imgprops=pdf.getImageProperties(imgdata)
          const pdfwidth=pdf.internal.pageSize.getWidth()
          const pdfheight=(imgprops.height*pdfwidth)/imgprops.width

      // 7. Add the image into the PDF document at position (0,0)
      pdf.addImage(imgdata,'PNG',0,0,pdfwidth,pdfheight)

        // 8. Convert the PDF to a Blob (binary file object)
        const blob=pdf.output('blob')
        
        //formdata
        const formdata=new FormData()
        formdata.append("userid",localStorage.getItem("userid"))
        formdata.append("pdf",blob,'resume.pdf')
        await dispatch(uploadcustomresume(formdata))
        
          alert("resume uploaded")
          navigate('/userProfile')
      

     
  }

  return (
<div className='d-flex flex-column gap-2' >
<Button variant="primary" disabled={loading} onClick={saveresume}>
  {loading ? (
    <>
      <Spinner animation="border" size="sm" className="me-2" />
      Uploading...
    </>
  ) : (
    "Save Resume"
  )}
</Button>
    
  
    <div className="resume-page-wrapper" style={{minWidth:'600px'}} > 
      {/* This header is outside the main resume card */}
      <header className="page-header-outside" style={{position:'sticky'}}>
        <h1 className="name-outside">{firstname} {lastname}</h1>
        <p className="professional-title-outside">{professionaltitle}</p>
      </header>

      {/* This is the actual resume content card */}
      <div className="resume-container">
        <div className="contact-info">
          <span>{phone}</span> |
          <span>{email}</span> |
          <span>{district}</span> |
          <span>{state}</span> |
          <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer">{linkedin}</a>
        </div>

        <section className="professional-summary-section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>{summary}</p>
        </section>

        <section className="skills-section">
          <h2>SKILLS</h2>
          <div className="skills-grid">
            {skills && skills.length > 0 ? (
              skills.map((skillItem, index) => (
                <div key={index} className="skill-item">
                  <p>{skillItem.skill} {skillItem.level ? `(${skillItem.level})` : ''}</p>
                </div>
              ))
            ) : (
              <>
                <div className="skill-item"><p>Project Management</p></div>
                <div className="skill-item"><p>Brand Development</p></div>
                <div className="skill-item"><p>Team Leadership</p></div>
                <div className="skill-item"><p>Product Knowledge</p></div>
                <div className="skill-item"><p>Content Development</p></div>
                <div className="skill-item"><p>Writing & Editing</p></div>
                <div className="skill-item"><p>Client Support</p></div>
                <div className="skill-item"><p>Public Relations</p></div>
                <div className="skill-item"><p>Computer Proficiency</p></div>
                <div className="skill-item"><p>Communication</p></div>
                <div className="skill-item"><p>Budgeting and Planning</p></div>
                <div className="skill-item"><p>Collaboration Talent</p></div>
              </>
            )}
          </div>
        </section>

        <section className="work-experience-section">
          <h2>WORK EXPERIENCE</h2>
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.role}</h3>
                <p className="company-info">
                  {exp.company} | {exp.location} | {new Date(exp.startdate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.enddate ? new Date(exp.enddate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </p>
                <ul className="description-list">
                  {exp.description && exp.description.split('\n').map((item, i) => (
                    item.trim() && <li key={i}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <>
              <div className="experience-item">
                <h3>Your Job Title Here</h3>
                <p className="company-info">Company Name | Location | Nov 2018 - Present</p>
                <p>Give a short paragraph to describe the position then list your achievements and responsibilities. Make sure your information is relevant to the role you are applying for. And describe the company if it is not well known.</p>
                <ul className="description-list">
                  <li>Led multiple team-based projects and effectively coordinated group tasks.</li>
                  <li>Successfully reduced large outstanding debt accounts to 25% above accepted industry levels, resulting in stabilization of occupancy and 25% revenue increase.</li>
                </ul>
              </div>
              <div className="experience-item">
                <h3>Your Job Title Here</h3>
                <p className="company-info">Company Name | Location | Mar 2015 - Sep 2018</p>
                <p>Be honest! Lying on your resume is never a good idea. You don’t want to overstate your skills or results as it will mislead the employer. Have confidence in what you have to offer.</p>
                <ul className="description-list">
                  <li>Skillfully remained calm under pressure when resolving tense issues.</li>
                  <li>Use firm numbers that the employer will understand and be impressed by. For example, how many people you supervised, how many products you sold, by what percentage you increased sales, etc.</li>
                  <li>Research, cultivate and solicit gifts of $25,000-$100,000.</li>
                </ul>
              </div>
              <div className="experience-item">
                <h3>Your Job Title Here</h3>
                <p className="company-info">Company Name | Location | Jun 2012 - Dec 2014</p>
                <ul className="description-list">
                  <li>Facilitated focus groups with 11 different students to hear a wide range of opinions and different perspectives.</li>
                  <li>Responsible for the organization, instruction, differentiation and assessment of an inclusive classroom for over 30 students.</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {educations && educations.length > 0 && (
          <section className="education-section">
            <h2>EDUCATION</h2>
            {educations.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree} in {edu.field}</h3>
                <p className="institute-info">
                  {edu.institute} | {new Date(edu.startdate).toLocaleDateString('en-US', { year: 'numeric' })} - {edu.enddate ? new Date(edu.enddate).toLocaleDateString('en-US', { year: 'numeric' }) : 'Present'}
                </p>
                {edu.extra && <p className="education-extra">{edu.extra}</p>}
              </div>
            ))}
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className="certifications-section">
            <h2>CERTIFICATIONS</h2>
            {certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <h3>{cert.title}</h3>
                <p className="certification-details">
                  Issued by: {cert.issued} on {new Date(cert.issuedate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
                {cert.credentialid && <p>Credential ID: {cert.credentialid}</p>}
                {cert.credentialurl && <p><a href={cert.credentialurl} target="_blank" rel="noopener noreferrer">View Credential</a></p>}
               
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
    </div>
  );
};

export default Template1;