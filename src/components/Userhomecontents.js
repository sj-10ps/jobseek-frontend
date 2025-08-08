import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profileminicard from './Profileminicard';
import Postminicard from './Postminicard';
import Postcard from './Postcard';
import { useSelector } from 'react-redux';
import CommentsView from './Comments';
import FollowersFollowing from './Followingandfollowers';

const Userhomecontents = () => {
  const location = useSelector((state) => state.location);

  return (
    <Container style={{ marginTop: '70px' }}>
      <Row className="gx-4" style={{ justifyContent: 'center' }}>
        {/* Left Column */}
        <Col xs={12} md={4} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Profileminicard />
          <Postminicard />
        </Col>

        {/* Right Column */}
        <Col xs={12} md={8}>
          {location.value === '/' && (
            <div
              style={{
                maxHeight: '80vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Postcard />
            </div>
          )}

          {location.value === '/comments' && (
            <div style={{ overflowY: 'auto', marginTop: 10 }}>
              <CommentsView />
            </div>
          )}

          {location.value === '/followers' && (
            <div style={{ marginTop: 10 }}>
              <FollowersFollowing />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Userhomecontents;
