// src/ResumeTemplate.jsx (updated)

import React from 'react';
import '../../css/ResumeTemplate.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetails } from '../../redux/Personaldetailsslice';
import { useEffect } from 'react';
import { uploadcustomresume } from '../../redux/uploadcustomresumeSlice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ContemporarySidebarResume = ({ userData, experiences, educations, certifications, skills }) => {
        const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(fetchdetails(localStorage.getItem("userid")))
    },[dispatch])
    console.log(userData)

        const {loading,success}=useSelector((state)=>state.uploadcustom)
   const navigate=useNavigate()
  const saveresume=async()=>{

  


      // 1. Select the resume section from the DOM using class name
    const input=document.querySelector('.cs-resume-page-wrapper')
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


  return (
     <div className='d-flex flex-column gap-2'>
    <Button onClick={saveresume} disabled={loading}>save resume</Button>
    <div className="cs-resume-page-wrapper" >
      <div className="cs-resume-container">
        {/* Left Sidebar */}
        <aside className="cs-sidebar">
          {/* Name and Title (often within sidebar for this style) */}
          <div className="cs-profile-header">
            <h1 className="cs-name">{firstname}</h1>
            <p className="cs-title">{professionaltitle}</p>
          </div>

          {/* Contact Info */}
          <section className="cs-sidebar-section cs-contact-info-section">
            <h2 className="cs-sidebar-title">Contact</h2>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Address:</strong> {district}</p>
            <p><strong>Address:</strong> {state}</p>
            <p><strong>LinkedIn:</strong> <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer">{linkedin}</a></p>
          </section>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="cs-sidebar-section cs-skills-section">
              <h2 className="cs-sidebar-title">Skills</h2>
              <ul className="cs-skills-list">
                {skills.map((s, index) => (
                  <li key={index}>{s.skill} {s.level ? `(${s.level})` : ''}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
          {educations && educations.length > 0 && (
            <section className="cs-sidebar-section cs-education-section">
              <h2 className="cs-sidebar-title">Education</h2>
              {educations.map((edu, index) => (
                <div key={index} className="cs-education-item">
                  <h3>{edu.degree}</h3>
                  <p className="cs-edu-field">{edu.field}</p>
                  <p className="cs-edu-institute">{edu.institute}</p>
                  <p className="cs-edu-dates">
                    {new Date(edu.startdate).toLocaleDateString('en-US', { year: 'numeric' })} - {edu.enddate ? new Date(edu.enddate).toLocaleDateString('en-US', { year: 'numeric' }) : 'Present'}
                  </p>
                  {edu.extra && <p className="cs-edu-extra">{edu.extra}</p>}
                </div>
              ))}
            </section>
          )}

         
        </aside>

        {/* Right Main Content */}
        <main className="cs-main-content">
          {/* Professional Summary */}
           {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="cs-main-section cs-experience-section">
              <h2 className="cs-main-title">Certifications</h2>
              {certifications.map((cert, index) => (
                <div key={index} className="cs-certification-item">
                  <h3>{cert.title}</h3>
                  <p className="cs-exp-header">Issued by: {cert.issued}</p>
                  <p className="cs-exp-dates">On: {new Date(cert.issuedate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  {cert.credentialid && <p className="cs-exp-company-location">ID: {cert.credentialid}</p>}
                  {cert.credentialurl && <p><a href={cert.credentialurl} target="_blank" rel="noopener noreferrer" className="cs-exp-company-location">View Credential</a></p>}

                </div>
              ))}
            </section>
          )}

          <section className="cs-main-section cs-summary-section">
            <h2 className="cs-main-title">Summary</h2>
            <p>{summary}</p>
          </section>

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <section className="cs-main-section cs-experience-section">
              <h2 className="cs-main-title">Experience</h2>
              {experiences.map((exp, index) => (
                <div key={index} className="cs-experience-item">
                  <div className="cs-exp-header">
                    <h3>{exp.role}</h3>
                    <span className="cs-exp-dates">
                      {new Date(exp.startdate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.enddate ? new Date(exp.enddate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </span>
                  </div>
                  <p className="cs-exp-company-location">{exp.company} | {exp.location}</p>
                  <ul className="cs-exp-description-list">
                    {exp.description && exp.description.split('\n').map((item, i) => (
                      item.trim() && <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
    </div>
  );
};

export default ContemporarySidebarResume;