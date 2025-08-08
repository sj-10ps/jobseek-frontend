import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { followingfollowercount } from '../redux/Followingandfollowercount';
import { ip } from '../redux/ip';
import { fetchmessagesenders } from '../redux/Fetchmessages';
import Messagingarea from './Messagingarea';

const Messaging = () => {
  const [userdata, setUserdata] = useState({});
  const logid = localStorage.getItem('logid');
  const { followerloading, followingdata } = useSelector(state => state.followingfollowercount);
  const { messageloading, messagesenders } = useSelector(state => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(followingfollowercount(logid));
    dispatch(fetchmessagesenders(logid));
  }, [dispatch, logid]);

  if (followerloading && messageloading) {
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
              {followingdata
                .filter(
                  follower =>
                    !messagesenders.some(sender => sender.data.id === follower.data.id)
                )
                .map(follower => {
                  const isUser = follower.type === 'user';
                  return (
                    <ListGroup.Item
                      key={follower.id}
                      action
                      onClick={() => setUserdata(follower)}
                      className="d-flex align-items-center"
                    >
                      <Image
                        src={
                          isUser
                            ? `${ip}/media/profile/${follower.data.image}`
                            : `${ip}/media/profile/${follower.data.logo}`
                        }
                        roundedCircle
                        style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 10 }}
                      />
                      <span>
                        {isUser ? follower.data.firstname : follower.data.name}
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
              {userdata?.data ? (
                <Messagingarea
                  name={
                    userdata.type === 'user'
                      ? userdata.data.firstname
                      : userdata.data.name
                  }
                  receiverid={userdata.data.logid}
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
