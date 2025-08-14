import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallusercompanies } from '../redux/fetchuserandcompanies';
import { useNavigate, useParams } from 'react-router-dom';
import { ip } from '../redux/ip';
import { checkfollowstatusall } from '../redux/followedstatus';
import { followunfollow } from '../redux/Followingslice';

const ViewallUsers = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const logid=localStorage.getItem("logid")
  const navigator=useNavigate()
  const { loading, success, data } = useSelector((state) => state.fetchusercompanies);
  const { followstatusloading, followstatussuccess, followdata } = useSelector((state) => state.followedstatus);

  const [loadingAction, setLoadingAction] = useState(null); // for individual button spinner

  const handlefollow = async (followingid) => {
    setLoadingAction(followingid);
    await dispatch(followunfollow({ followingid, followerid: localStorage.getItem("logid") }));
    dispatch(checkfollowstatusall({ followerid: localStorage.getItem("logid") }));
    setLoadingAction(null);
  };

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('query', query);
    dispatch(fetchallusercompanies(formdata));
    dispatch(checkfollowstatusall({ followerid: localStorage.getItem("logid") }));
  }, [query, dispatch]);

  if (loading||followstatusloading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4" style={{ height: "90vh", overflowY: 'scroll', padding: 10 ,scrollbarWidth:'none',marginTop:30}}>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 flex-column">
        {success && data.map((item) => {
          if (item.type === 'user') {
            const isFollowed = (followdata||[]).some((f) => f.userfollowing === item.login);
            console.log(isFollowed)

            return (
              <Col key={item._id}>
                <Card style={{ minHeight: '100%' }}>
                  <Card.Img
                    variant="top"
                    src={item.image != null ? `${ip}/media/profile/${item.image}` : 'no image'}
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.professionaltitle}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Email:</strong> {item.email}<br />
                      <strong>Phone:</strong> {item.phone}<br />
                      <strong>Age:</strong> {item.age}<br />
                      <strong>Gender:</strong> {item.gender}<br />
                      <strong>Location:</strong> {item.district}, {item.state}<br />
                      <strong>Summary:</strong> {item.summary}<br />
                    </Card.Text>
                    {item.linkedin && (
                      <Card.Link href={item.linkedin} target="_blank">
                        LinkedIn
                      </Card.Link>
                    )}
                    {item.github && (
                      <Card.Link href={item.github} target="_blank">
                        GitHub
                      </Card.Link>
                    )}
                      <Card.Link onClick={()=>navigator(`/userProfile/${item._id}`)}>
                        View posts
                      </Card.Link>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Joined: {new Date(item.createdat).toLocaleDateString()}
                  </Card.Footer>
                  <div className="p-2 text-center">
                    <Button
                      onClick={() => handlefollow(item.login)}
                      disabled={item.login===logid}
                    >
                      {loadingAction === item.login ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        isFollowed ? "Unfollow" : "Follow"
                      )}
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          } else if (item.type === 'company') {
            const isFollowed = followdata.some((f) => f.userfollowing === item.login);
            return (
              <Col key={item._id}>
                <Card bg="light" style={{ minHeight: '100%' }}>
                  <Card.Img
                    variant="top"
                    src={item.logo != null ? `${ip}/media/profile/${item.logo}` : 'no image'}
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.industry || 'No sector specified'}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Email:</strong> {item.email || 'N/A'}<br />
                      <strong>Phone:</strong> {item.phone || 'N/A'}<br />
                      <strong>Location:</strong> {item.district}, {item.state}<br />
                      <strong>Description:</strong> {item.description || 'No description'}<br />
                    </Card.Text>
                    {item.website && (
                      <Card.Link href={item.website} target="_blank">
                        Website
                      </Card.Link>
                    )}

                    <Card.Link onClick={()=>navigator(`/companyprofile/${item._id}`)}>
                        View posts
                      </Card.Link>
                   
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Registered: {new Date(item.registeredat).toLocaleDateString()}
                  </Card.Footer>
                  <Button onClick={()=>handlefollow(item.login)}>
                    {isFollowed?'unfollow':'follow'}

                  </Button>
                </Card>
              </Col>
            );
          }
          return null;
        })}
      </Row>
    </Container>
  );
};

export default ViewallUsers;
