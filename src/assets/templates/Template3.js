import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetails } from '../../redux/Personaldetailsslice';
import { useEffect } from 'react';
import { uploadcustomresume } from '../../redux/uploadcustomresumeSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const ContemporarySidebarResume = ({
  userData,
  experiences,
  educations,
  certifications,
  skills
}) => 
    {
             const dispatch=useDispatch()
            useEffect(()=>{
              dispatch(fetchdetails(localStorage.getItem("userid")))
            },[dispatch])
            console.log(userData)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatYearOnly = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric' });
  };

      const {loading,success}=useSelector((state)=>state.uploadcustom)
   const navigate=useNavigate()
  const saveresume=async()=>{

  


      // 1. Select the resume section from the DOM using class name
    const input=document.querySelector('.resume-page-wrapper')
    if(!input) return;


      // 3. Convert the selected HTML element to a canvas (image of the DOM)
  // `scale: 2` makes the image high-resolution (2x zoom)
    const canvas=await html2canvas(input,{scale:2})

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

    <div className='d-flex flex-column gap-2'>
    <Button onClick={saveresume} disabled={loading}>save resume</Button>
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      margin: 0
    }} className='resume-page-wrapper'>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        minHeight: '1000px'
      }}>
        {/* Left Sidebar */}
        <aside style={{
          width: '350px',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}>
          {/* Profile Header */}
          <div style={{
            textAlign: 'center',
            paddingBottom: '20px',
            borderBottom: '2px solid #34495e'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              letterSpacing: '1px',
              lineHeight: '1.2'
            }}>
              {userData.firstname}   {userData.lastname} 



              
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#ecf0f1',
              margin: 0,
              fontWeight: '300',
              letterSpacing: '0.5px'
            }}>
              {userData.professionaltitle}
            </p>
          </div>

          {/* Contact Info */}
          <section>
            <h2 style={sectionTitleStyle}>Contact</h2>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              {userData.phone && renderContact("Phone:", userData.phone)}
              {userData.email && renderContact("Email:", userData.email)}
              {userData.address && renderContact("Address:", userData.address)}
              {userData.linkedin && renderContact("LinkedIn:", (
                <a href={`https://${userData.linkedin}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {userData.linkedin}
                </a>
              ))}
            </div>
          </section>

          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <h2 style={sectionTitleStyle}>Skills</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
                {skills.map((s, index) => (
                  <li key={index} style={skillItemStyle}>
                    <span style={{ fontWeight: '500' }}>{s.skill}</span>
                    {s.level && (
                      <span style={skillLevelStyle}>
                        {s.level}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <h2 style={sectionTitleStyle}>Certifications</h2>
              {certifications.map((cert, index) => (
                <div key={index} style={cardStyle}>
                  <h3 style={{ ...cardTitleStyle, fontSize: '14px', lineHeight: '1.3' }}>{cert.title}</h3>
                  <p style={cardTextStyle}>Issued by: {cert.issued}</p>
                  <p style={cardTextStyle}>{formatDate(cert.issuedate)}</p>
                  {cert.credentialid && <p style={cardTextStyle}>ID: {cert.credentialid}</p>}
                  {cert.credentialurl && (
                    <a href={cert.credentialurl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                      View Credential →
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Right Main Content */}
        <main style={{ flex: 1, padding: '40px', backgroundColor: '#ffffff' }}>

          {/* Education */}
          {educations?.length > 0 && (
            <section>
              <h2 style={mainTitleStyle}>Education</h2>
              {educations.map((edu, index) => (
                <div key={index} style={cardStyle}>
                  <h3 style={cardTitleStyle}>{edu.degree}</h3>
                  <p style={cardSubtitleStyle}>{edu.field}</p>
                  <p style={cardTextStyle}>{edu.institute}</p>
                  <p style={cardTextStyle}>
                    {formatYearOnly(edu.startdate)} - {edu.enddate ? formatYearOnly(edu.enddate) : 'Present'}
                  </p>
                  {edu.extra && (
                    <p style={cardExtraStyle}>{edu.extra}</p>
                  )}
                </div>
              ))}
            </section>
          )}
          {/* Professional Summary */}
          {userData.summary && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={mainTitleStyle}>Professional Summary</h2>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#34495e',
                margin: 0,
                textAlign: 'justify'
              }}>
                {userData.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experiences?.length > 0 && (
            <section>
              <h2 style={mainTitleStyle}>Professional Experience</h2>
              {experiences.map((exp, index) => (
                <div key={index} style={expContainerStyle}>
                  <div style={expHeaderStyle}>
                    <h3 style={expRoleStyle}>{exp.role}</h3>
                    <span style={expDateStyle}>
                      {formatDate(exp.startdate)} - {exp.enddate ? formatDate(exp.enddate) : 'Present'}
                    </span>
                  </div>
                  <p style={expCompanyStyle}>
                    {exp.company} | {exp.location}
                  </p>
                  <ul style={expListStyle}>
                    {exp.description?.split('\n').map((item, i) =>
                      item.trim() && <li key={i} style={{ marginBottom: '8px' }}>{item.trim()}</li>
                    )}
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

//
// 🔧 Inline styles reused for readability
//
const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '15px',
  color: '#ecf0f1',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const cardStyle = {
  backgroundColor: '#34495e',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '15px'
};

const cardTitleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 5px 0',
  color: '#ecf0f1'
};

const cardSubtitleStyle = {
  fontSize: '14px',
  color: '#bdc3c7',
  margin: '3px 0',
  fontWeight: '500'
};

const cardTextStyle = {
  fontSize: '12px',
  color: '#95a5a6',
  margin: '3px 0'
};

const cardExtraStyle = {
  fontSize: '12px',
  color: '#3498db',
  margin: '5px 0 0 0',
  fontStyle: 'italic'
};

const skillItemStyle = {
  margin: '8px 0',
  padding: '8px 12px',
  backgroundColor: '#34495e',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const skillLevelStyle = {
  fontSize: '12px',
  color: '#95a5a6',
  fontWeight: '300'
};

const linkStyle = {
  color: '#3498db',
  textDecoration: 'none',
  wordBreak: 'break-all'
};

const mainTitleStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#2c3e50',
  marginBottom: '30px',
  position: 'relative',
  paddingBottom: '10px'
};

const expContainerStyle = {
  marginBottom: '35px',
  padding: '25px',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  borderLeft: '4px solid #3498db'
};

const expHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '10px',
  flexWrap: 'wrap',
  gap: '10px'
};

const expRoleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#2c3e50',
  margin: 0
};

const expDateStyle = {
  fontSize: '14px',
  color: '#7f8c8d',
  fontWeight: '500',
  backgroundColor: '#ecf0f1',
  padding: '4px 12px',
  borderRadius: '20px'
};

const expCompanyStyle = {
  fontSize: '16px',
  color: '#3498db',
  margin: '5px 0 15px 0',
  fontWeight: '500'
};

const expListStyle = {
  margin: 0,
  paddingLeft: '20px',
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#34495e'
};

const renderContact = (label, value) => (
  <p style={{ margin: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ fontWeight: '600', minWidth: '60px' }}>{label}</span>
    <span style={{ color: '#bdc3c7', wordBreak: 'break-word' }}>{value}</span>
  </p>
);
