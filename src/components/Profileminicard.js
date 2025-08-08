import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchprofile } from '../redux/Profilefetch';
import { useEffect } from 'react';
import { ip } from '../redux/ip';
import { Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { followingfollowercount } from '../redux/Followingandfollowercount';
import { setLocation } from '../redux/LocationSlice';

const Profileminicard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const logid = localStorage.getItem("logid");

  const { loading, success, data } = useSelector((state) => state.profile);
  const { followerloading, followercount, followingcount } = useSelector((state) => state.followingfollowercount);

  useEffect(() => {
    dispatch(fetchprofile(userid));
    dispatch(followingfollowercount(logid));
  }, [userid, dispatch]);

  return (
    <Card style={{
      width: '100%',
      maxWidth: '300px',
    
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      textAlign: 'center',
      paddingTop: '20px'
    }}>
      <Card.Body>

        {(loading || followerloading) && (
          <div className="d-flex justify-content-center my-3">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {success && (
          <>
            <Image
              src={data.image === "pending" ? `logo512.png` : `${ip}/media/profile/${data.image}`}
              roundedCircle
              style={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                border: '3px solid #007bff',
                marginBottom: '10px'
              }}
            />
            <Card.Title className="text-primary fs-5 mb-1">
              {data.firstname} {data.lastname}
            </Card.Title>
            <Card.Text className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
              {data.email}
            </Card.Text>

            <div
              onClick={() => dispatch(setLocation('/followers'))}
              style={{
                cursor: 'pointer',
                border: '2px solid #007bff',
                borderRadius: '8px',
                backgroundColor: '#e7f1ff',
                padding: '5px 10px',
                marginBottom: '15px',
                transition: '0.2s ease'
                
              }}
              className="hoverable"
            >
              <Card.Text className="mb-0" style={{ fontSize: '0.9rem', color: '#007bff' }}>
                <strong>Followers:</strong> {followercount} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Following:</strong> {followingcount}
              </Card.Text>
            </div>

            <Button variant="primary" onClick={() => navigate('/userProfile')}>
              View Profile
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Profileminicard;
