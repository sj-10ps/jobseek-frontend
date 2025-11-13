import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ip } from '../redux/ip';

import Messagingarea from './Messagingarea';
import { fetchmessagingusers } from '../redux/Messagingusers';

const Messaging = () => {
  const [userdata, setUserdata] = useState({});
  const logid = localStorage.getItem('logid');
  const {fetchmessagingusersloading,fetchmessaginguserssuccess,fetchmessagingusersdata}=useSelector(state=>state.fetchmessagingusers)
   
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(fetchmessagingusers(logid))
  }, [dispatch, logid]);

  if (fetchmessagingusersloading) {
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
              <strong>Messenger</strong>
            </Card.Header>
            <ListGroup variant="flush" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {fetchmessagingusersdata.map(follower => {
                  const isUser = follower.usertype === 'user';
                  return (
                    <ListGroup.Item
                      key={follower._id}
                      action
                      onClick={() => setUserdata(follower)}
                      className="d-flex align-items-center"
                    >
                      <Image
                        src={
                          isUser
                            ? `${follower.userdetails.image}`
                            : `${follower.companydetails.logo}`
                        }
                        roundedCircle
                        style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 10 }}
                      />
                      <span>
                        {isUser ? follower.userdetails.firstname : follower.companydetails.name}
                      </span>
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
                    userdata.usertype === 'user'
                      ? userdata.userdetails.firstname
                      : userdata.companydetails.name
                  }
                  receiverid={userdata._id}
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

export default Messaging;
