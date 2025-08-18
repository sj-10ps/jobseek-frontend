import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Spinner, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ip } from '../redux/ip';

import Messagingarea from './Messagingarea';

import { selectedusers } from '../redux/selecteduserstext';

const Companyselecteduserstext = () => {
  const [userdata, setUserdata] = useState({});
  const comid = localStorage.getItem('userid');
  const {selectedsuccess,selectedloading,selecteddata}=useSelector(state=>state.selectedusers)
   
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(selectedusers(comid))
  }, [dispatch, comid]);

  if (selectedloading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid className="mt-4">
      <Row style={{gap:4}}>
        {/* Sidebar */}
        <Col md={2}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
              <strong>Applicants</strong>
            </Card.Header>
            <ListGroup variant="flush" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {selecteddata.map(follower => {
                
                  return (
                    <ListGroup.Item
                      key={follower._id}
                      action
                      onClick={() => setUserdata(follower)}
                      className="d-flex align-items-center"
                    >
                      <Image
                        src={
                          `${ip}/media/profile/${follower.user.image}`
                          
                        }
                        roundedCircle
                        style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 10 }}
                      />
                      <span>
                        { follower.user.firstname }  
                      </span>
                      <Badge bg='success' style={{marginLeft:10}}>{follower.status}</Badge> 
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </Card>
        </Col>

        {/* Chat Section */}
        <Col md={6}>
          <Card className="shadow-sm" style={{ minHeight: '80vh' }}>
            <Card.Header className="bg-secondary text-white text-center">
              <strong>Messaging</strong>
            </Card.Header>
            <Card.Body style={{ overflowY: 'auto' }}>
              {userdata._id ? (
                <Messagingarea
                  name={
                   
                       userdata.user.firstname
                 
                  }
                  receiverid={userdata.user.login}
                />
              ) : (
                <div className="text-center text-muted mt-5">
                  <p>Select a follower to start chatting.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Companyselecteduserstext;
