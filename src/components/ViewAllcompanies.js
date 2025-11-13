import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {checkfollowstatus, resetstatus} from '../redux/followedstatus'

import { useParams } from 'react-router-dom';
import { fetchcompany } from '../redux/fetchcompanydetails';
import { ip } from '../redux/ip';
import { followunfollow } from '../redux/Followingslice';
import Postcard from './Postcard';

const ViewAllcompanies = () => {
  const dispatch = useDispatch();

  const {othercompanyid}=useParams()
  const { loading, data, success } = useSelector((state) => state.fetchcompany);
  const {followstatusloading,followdata}=useSelector((state)=>state.followedstatus)

  useEffect(() => {
  
    dispatch(fetchcompany(othercompanyid)); 
    dispatch(checkfollowstatus({followingid:data.login,followerid:localStorage.getItem("logid")}))

  }, [dispatch,othercompanyid]);

  const handlefollow=async()=>{
  await dispatch (followunfollow({followingid:data.login,followerid:localStorage.getItem("logid")}))
  dispatch(checkfollowstatus({followingid:data.login,followerid:localStorage.getItem("logid")}))
 
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }
  



  return (
    <Container className="mt-4" style={{ height: "90vh", padding: 10 }}>
      <div className='d-flex gap-4 justify-content-between'>
      <Row className="d-flex flex-column">
        
     
  <Col >
    <Card bg="light" >
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {data.industry || 'No sector specified'}
        </Card.Subtitle>
        <Card.Text>
          <strong>Email:</strong> {data.email || 'N/A'}<br />
          <strong>Phone:</strong> {data.phone || 'N/A'}<br />
          <strong>District:</strong> {data.district}<br />
          <strong>State:</strong> {data.state}<br />
          <strong>Location:</strong> {data.location}<br />
          <strong>Status:</strong> {data.status}<br />
          <strong>Description:</strong> {data.description || 'No description'}<br />
        </Card.Text>

        {data.website && (
          <Card.Link href={data.website} target="_blank">
            Website
          </Card.Link>
        )}
        {data.linkedin && (
          <Card.Link href={data.linkedin} target="_blank">
            LinkedIn
          </Card.Link>
        )}
        {data.logo && (
          <div className="mt-2">
            <img
              src={data.logo!==null?`${data.logo}`:'no image'}
              alt="Company Logo"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
            />
          </div>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        Registered: {new Date(data.registeredat).toLocaleDateString()}<br />
        Approved: {data.approvedat ? new Date(data.approvedat).toLocaleDateString() : 'Not Approved'}<br />
        Updated: {new Date(data.updatedat).toLocaleDateString()}
    
      </Card.Footer>
      {othercompanyid!==localStorage.getItem("comid")&&(
          <Button onClick={handlefollow}>
          {followstatusloading&&<Spinner animation='border'/>}
          {followdata.length===0?'follow':'unfollow'}
        </Button>
        )}

    </Card>
  </Col>


      </Row>
     <div style={{overflowY:'scroll',width:'400px',maxHeight:'90vh'}}>
      <Postcard otheruserid={data.login}/>
      </div>
      </div>
    </Container>
  );
};

export default ViewAllcompanies;
