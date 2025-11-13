import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form } from 'react-bootstrap';
import Postcard from './Postcard';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcompany } from '../redux/fetchcompanydetails';
import { ip } from '../redux/ip';
import { uploadpost } from '../redux/PostingSlice';
import { postfetch } from '../redux/Postslice';
import CommentsView from './Comments';
import FollowersFollowing from './Followingandfollowers';
import { setLocation } from '../redux/LocationSlice';
import { followingfollowercount } from '../redux/Followingandfollowercount';

const CompanyProfile = () => {
    const companyid=localStorage.getItem("userid")
    const logid=localStorage.getItem("logid")
    const {loading,success,data}=useSelector((state)=>state.fetchcompany)
    const {followerloading,followercount,followingcount} =useSelector((state)=>state.followingfollowercount)
    const location=useSelector((state)=>state.location)
     const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(fetchcompany(companyid))
       dispatch(postfetch(logid))
        dispatch(followingfollowercount(logid))
    },[dispatch])
 


  const [description, setDescription] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const handlesubmit=(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('file',selectedImage)
    formdata.append('des',description)
    formdata.append('userid',logid)
    dispatch(uploadpost(formdata))
    alert("uploaded")
  }


  return (
    <div className="container d-flex gap-4 mt-2">
      {/* LEFT SIDE - Company Details */}
      <div className="col-md-8">
    
        <Card className="shadow" style={{position:'sticky',top:0,maxWidth:'35rem'}}>
          <Card.Body>
            {loading&&'fetching details'}
            <div className="d-flex align-items-center gap-3 mb-3">
              <img src={`${data.logo}`} alt="Logo" className="rounded" style={{ width: '80px', height: '80px' }} />
              <h3 className="mb-0">{data.name}</h3>
            </div>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
            <p><strong>Location:</strong> {data.location}, {data.district}, {data.state}</p>
            <p><strong>Industry:</strong> {data.industry}</p>
            <p><strong>Website:</strong> <a href={data.website} target="_blank" rel="noopener noreferrer">{data.website}</a></p>
            <p><strong>LinkedIn:</strong> <a href={data.linkedin} target="_blank" rel="noopener noreferrer">{data.linkedin}</a></p>
            <p><strong>Description:</strong> {data.description}</p>
              <div onClick={()=>dispatch(setLocation('/followers'))} style={{cursor:'pointer',border:'2px solid blue',textAlign:'center',backgroundColor:'blue',height:'30px',marginBottom:10}}>
                      <Card.Text className='fs-8'  >
                      <strong>followers:</strong> {followercount} <strong>following:</strong> {followingcount}
                      
                      
                    
                    </Card.Text>
                    </div>
          </Card.Body>
        </Card>
              
        <Card className="shadow mb-4" style={{marginTop:3,maxWidth:'35rem'}} >
          <Card.Body>
            <h5 className="mb-3">Upload Photo</h5>
            <Form onSubmit={handlesubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" accept="image/*" onChange={(e)=>setSelectedImage(e.target.files[0])} />
            </Form.Group>
         

            <h5 className="mb-2">Update Description</h5>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-3"
            />
            <Button variant="primary" type='submit' >Upload</Button>
            </Form>
          </Card.Body>
        </Card>
      
       
      </div>

  
    
      <div className="col-md-4" style={{  top: '20px' ,maxHeight:'90vh',overflow:'scroll',scrollbarWidth:'none'}}>
         

   
     {location.value==='/'&&
       <Card className="shadow" style={{maxWidth:'50rem',position:'sticky',zIndex:0,top:'70px'}}>
          <Postcard/>
        </Card>
     }
    

             {location.value === "/comments" && (
            <div style={{
              flexGrow: 1,
              overflowY: 'auto',
              marginTop: 10,
              position:'sticky',zIndex:0,top:'70px'
            }}>
              <CommentsView />
            </div>
          )}
        
          {console.log(location.value)}
            {location.value === "/followers" && (
            <div style={{
            
             position:'sticky',zIndex:0,top:'70px'

            }}>
             <FollowersFollowing/>
            </div>
          )}
      </div>
    </div>
  );
};

export default CompanyProfile;
