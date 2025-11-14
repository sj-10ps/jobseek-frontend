
import Card from 'react-bootstrap/Card';
import { Button, Image, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetails } from '../redux/Personaldetailsslice';
import { ip } from '../redux/ip'; 
import { Link, useNavigate, useParams } from 'react-router-dom'; // Keep if you use Link elsewhere
import { setid, setLocation } from '../redux/LocationSlice';
import UserForm from './ProfileUpdateCard';
import SimpleImageUpload from './UpdateImage';
import Educationform from './Educationform';
import ExperienceForm from './Experienceform';
import SkillsForm from './Skillsform';
import CertificationForm from './Certificationform';
import { MdDelete } from "react-icons/md";
import ResumeCard from './Uploadresume';
import { deleterecord } from '../redux/deleterecord'; 
import { fetchcustomresume } from '../redux/uploadcustomresumeSlice';
import Postcard from './Postcard';
import { followunfollow } from '../redux/Followingslice';
import { passreset } from '../redux/PassresetSlice';
import { checkfollowstatus } from '../redux/followedstatus';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userid = localStorage.getItem("userid");
  const logid=localStorage.getItem("logid")
  const navigate=useNavigate()
  const {otheruserid}=useParams()

  const { value} = useSelector((state) => state.location);
  
  const { loading, success, profiledata, certificatedata, educationdata, experiencedata, skillsdata } = useSelector((state) => state.userdetails);
  const {data,successresume,loadingresume}=useSelector((state)=>state.uploadcustom)
  const {loadingfollow,successfollow,followedstatus}=useSelector((state)=>state.followunfollow)
  const {followstatussuccess,followstatusloading,followdata} =useSelector((state)=>state.followedstatus)
 




  useEffect(() => {
    if (otheruserid) { 
      dispatch(fetchdetails(otheruserid));
      dispatch(fetchcustomresume(otheruserid))
      dispatch(checkfollowstatus({followingid:otheruserid,followerid:userid}))
     
    
    
     
  
    }else{

       dispatch(fetchdetails(userid));
       
      dispatch(fetchcustomresume(userid))
    
    }
  }, [dispatch, userid,otheruserid]); 




const handlefollowunfollow=async(otheruserloginid)=>{
   await dispatch(checkfollowstatus({followingid:otheruserloginid,followerid:logid}))
 dispatch(followunfollow({followingid:otheruserloginid,followerid:logid}))
 
  
  
  
  
}


 
  const handleDelete = async(recordId, recordType) => {
  
    if (window.confirm(`Are you sure you want to delete this ${recordType} record?`)) {
      const formdata = new FormData();
      formdata.append("id", recordId);
      formdata.append("type", recordType);
      formdata.append("userid", userid); 
      dispatch(setLocation('/userProfile'))
      dispatch(deleterecord(formdata));
      await dispatch(fetchdetails(userid))
      
  
    }
  };

  return (

 <div className="d-flex m-3 justify-content-between  gap-4 " style={{width:'100%',flexWrap:'wrap'}}>

    <div className="d-flex flex-column p-4 gap-2 pt-3 " style={{height:'100vh', overflow:'scroll',scrollbarWidth:'none'}}>

      <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem',padding:'20px' }}>
        {loading && <div className="p-3 text-center">Loading details...</div>}

        {success && (
          <Card.Body className="p-4">
            {/* Profile Image Section */}
            {value === '/updateimage' ? (
              <SimpleImageUpload />
            ) : (
              <div
                className="position-relative d-flex flex-column align-items-center mb-3"
                style={{ cursor: 'pointer' }}
                onClick={!otheruserid?() => dispatch(setLocation('/updateimage')):undefined}
              >
                <Image
                  src={profiledata.image !== 'pending' ? `${profiledata.image}` : 'logo512.png'}
                  roundedCircle
                  style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                />
                {!otheruserid&&
                          <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 110,
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '0.3rem 0.6rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    
                  }}
                >+</span>
                }
      
              </div>
            )}

            {/* Title & Subtitle */}
            <Card.Title className="text-center fs-4 fw-bold">
              {`${profiledata.firstname}`.toUpperCase()} {`${profiledata.lastname}`.toUpperCase()}
            </Card.Title>
            <Card.Subtitle className="mb-3 text-muted text-center">{profiledata.professionaltitle}</Card.Subtitle>

            {/* Main Info */}
            <Card.Text><strong>Email:</strong> {profiledata.email}</Card.Text>
            <Card.Text><strong>Phone:</strong> {profiledata.phone || <span className="text-secondary">Add phone no...</span>}</Card.Text>
             <Card.Text className='text-secondary'>{profiledata.summary || 'Add summary ...'}</Card.Text>

            <div className="d-flex justify-content-between">
              <Card.Text><strong>Gender:</strong> {profiledata.gender || <span className="text-secondary">Add gender...</span>}</Card.Text>
              <Card.Text><strong>Age:</strong> {profiledata.age || <span className="text-secondary">Add age...</span>}</Card.Text>
            </div>

            <div className="d-flex justify-content-between">
              <Card.Text><strong>District:</strong> {profiledata.district || <span className="text-secondary">Add district...</span>}</Card.Text>
              <Card.Text><strong>State:</strong> {profiledata.state || <span className="text-secondary">Add state...</span>}</Card.Text>
            </div>

            {/* Links */}
            <div className="d-flex flex-column gap-2 my-3">
              <Card.Link href={profiledata.linkedin} className="text-primary">🔗 LinkedIn</Card.Link>
              <Card.Link href={profiledata.github} className="text-dark">💻 GitHub</Card.Link>
            </div>

            {/* Update Button */}
            <Card.Footer className="bg-transparent border-top-0 text-center mt-4">
               {!otheruserid||userid===otheruserid?
              <Button variant="primary" onClick={(e) => {
                e.preventDefault();
                dispatch(setLocation("/profileForm"));
                dispatch(setid(profiledata._id));
              }}>
                ✏️ Update Personal Details
              </Button>:
                  <Button variant="primary" onClick={
               ()=>
                  handlefollowunfollow(profiledata.login)
               

              }>
            
            {followstatusloading&&<Spinner animation='border'/>}
              {followdata!==null?'follow':'unfollow'}
              </Button>
}
            </Card.Footer>  
          </Card.Body>
        )}

        {/* Conditional User Form */}
        {value === "/profileForm" && <UserForm />}
      </Card>

    <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
        <Card.Body>
          <Card.Title>Education</Card.Title>
          {loading && <>Loading data....</>}
          {success && educationdata.map((edu) => (
          <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '28rem' }}>
              <Card.Body>
                <Card.Text>
                  <strong> Degree: </strong> {edu.degree}
                </Card.Text>
                <Card.Text>
                  <strong> Institute: </strong>{edu.institute}
                </Card.Text>
                <Card.Text>
                  <strong> Field:</strong> {edu.field}
                </Card.Text>
                <Card.Text>
                  <strong> Description:</strong> {edu.extra}
                </Card.Text>

                <div className='d-flex gap-1'>
                  <Card.Text>
                    <strong> From: </strong>{new Date(edu.startdate).toLocaleDateString('en-GB')}
                  </Card.Text>
                  <Card.Text>
                    <strong>  To:</strong> {new Date(edu.enddate).toLocaleDateString('en-GB')}
                  </Card.Text>
                </div>
                <Card.Footer>
                   {!otheruserid&&
                  <MdDelete
                    style={{ cursor: edu._id !=null?'pointer':'none', fontSize: '24px', color: 'red' }}
                    onClick={() => handleDelete(edu._id, "education")}
                    
                  />
                   }
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
           {!otheruserid&&
          <Button onClick={(e) => { e.preventDefault(); dispatch(setLocation("/educationform")); dispatch(setid(localStorage.getItem('userid'))) }} >Add education</Button>
           }
          </Card.Body>
        {value === '/educationform' && <Educationform />}
      </Card>

    <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
        <Card.Body>
          <Card.Title>Experience</Card.Title>
          {loading && <>Loading data....</>}
          {success && experiencedata.map((exp) => (
            <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
              <Card.Body>
                <Card.Text><strong>Company:</strong> {exp.company}</Card.Text>
                <Card.Text><strong>Role:</strong> {exp.role}</Card.Text>
                <Card.Text><strong>Location:</strong> {exp.location}</Card.Text>
                <Card.Text><strong>Description:</strong> {exp.description}</Card.Text>

                <div className='d-flex gap-3'>
                  <Card.Text><strong>From:</strong> {new Date(exp.startdate).toLocaleDateString('en-GB')}</Card.Text>
                  <Card.Text><strong>To:</strong> {new Date(exp.enddate).toLocaleDateString('en-GB')}</Card.Text>
                </div>
                <Card.Footer>
                   {!otheruserid&&
                  <MdDelete
                    style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
                    onClick={() => handleDelete(exp._id, "experience")}
                  />
                   }
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}


 {!otheruserid&&
          <Button
            onClick={(e) => {
              e.preventDefault()
              dispatch(setLocation("/experienceform"))
              dispatch(setid(localStorage.getItem("userid")))
            }}
          >
            Add Experience
          </Button>
}
          {value === '/experienceform' && <ExperienceForm />}
        </Card.Body>
      </Card>

     <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
        <Card.Body>
          <Card.Title>Skills</Card.Title>
          {loading && <>Loading data....</>}
          {success && skillsdata.map((skill) => (
            <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
              <Card.Body>
                <Card.Text><strong>Skill:</strong> {skill.skill}</Card.Text>
                <Card.Text><strong>Proficiency:</strong> {skill.level}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="link" onClick={() => handleDelete(skill._id, "skill")} className="p-0 border-0">
                   {!otheruserid&&
                  <MdDelete style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }} />
                   }
                </Button>
              </Card.Footer>
            </Card>
          ))}


         {!otheruserid&&
          <Button
            className='mt-3'
            onClick={(e) => {
              e.preventDefault();
              dispatch(setLocation("/skillform"));
              dispatch(setid(localStorage.getItem("userid")));
            }}
          >
            Add Skill
          </Button>
}
          {value === '/skillform' && <SkillsForm />}
        </Card.Body>
      </Card>

     <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
        <Card.Body>
          <Card.Title>Certifications</Card.Title>
          {loading && <>Loading data...</>}

          {success && certificatedata.map((cert) => {
            const fileUrl = `${cert.media}`;
            const fileExt = cert.media?.split('.').pop().toLowerCase();
            const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt);
            const isPDF = fileExt === 'pdf';
            const isDoc = ['doc', 'docx'].includes(fileExt);

            return (
            <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
                <Card.Body>
                  {/* File Preview */}
                  {cert.media && (
                    <div className="mb-3">
                      {isImage && (
                        <Image
                          src={fileUrl}
                          thumbnail
                          style={{ maxHeight: '180px', objectFit: 'cover' }}
                        />
                      )}
                      {isPDF && (
                        <Card.Link href={fileUrl} target="_blank" rel="noopener noreferrer">
                          📄 View PDF
                        </Card.Link>
                      )}
                      {isDoc && (
                        <Card.Link href={fileUrl} target="_blank" rel="noopener noreferrer">
                          📝 View Word Document
                        </Card.Link>
                      )}
                      {!isImage && !isPDF && !isDoc && (
                        <Card.Link href={fileUrl} target="_blank" rel="noopener noreferrer">
                          📎 Download File
                        </Card.Link>
                      )}
                    </div>
                  )}

                  {/* Certification Details */}
                  <Card.Text><strong>Title:</strong> {cert.title}</Card.Text>
                  <Card.Text><strong>Issued By:</strong> {cert.issued}</Card.Text>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(cert.issuedate).toLocaleDateString('en-GB')}
                  </Card.Text>
                  <Card.Text><strong>Credential ID:</strong> {cert.credentialid}</Card.Text>
                  <Card.Text>
                    <strong>Credential URL:</strong>{' '}
                    {cert.credentialurl ? (
                      <Card.Link href={cert.credentialurl} target="_blank">
                        View Credential
                      </Card.Link>
                    ) : (
                      <span className="text-muted">Not provided</span>
                    )}
                  </Card.Text>
                  <Card.Footer>
                     {!otheruserid&&
                    <MdDelete
                      style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
                      onClick={() => handleDelete(cert._id, "certificate")}
                    />
                     }
                  </Card.Footer>
                </Card.Body>
              </Card>
            );
          })}

         {!otheruserid&&
          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(setLocation("/certificationform"));
              dispatch(setid(localStorage.getItem('userid')));
            }}
          >
            Add Certification
          </Button>
}
        </Card.Body>
        {value === '/certificationform' && <CertificationForm />}
      </Card>

      <ResumeCard  otheruserid={otheruserid}/>
    </div>
    <div className='me-4 d-flex flex-column gap-3' style={{height:'100vh'}}>
       {!otheruserid&&
      <Button className='btn btn-primary' onClick={()=>navigate('/resumetemplates')}>Generate Resume</Button>
       }
      <div>
         <Card className='w-100 w-md-75 w-lg-50' style={{maxWidth:'30rem'}}>
        <Card.Body>
          <Card.Title>Custom Resume</Card.Title>
          {loadingresume&&<>loading resume</>}
          {data?.generatedPdf??false?<Card.Link href={`${data.generatedPdf}`}>📄 View resume</Card.Link>:'no document'}
          
        </Card.Body>

       </Card>
      </div>
      {success&&otheruserid&&
      <div style={{overflow:'scroll',width:'400px',scrollbarWidth:'none'}}>
      <Postcard otheruserid={profiledata.login}/>
      </div>
      }
    </div>
    </div>
  );
}

export default UserProfile;