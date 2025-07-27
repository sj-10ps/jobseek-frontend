import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profileminicard from './Profileminicard';
import Postminicard from './Postminicard';
import Postcard from './Postcard';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import CommentsView from './Comments';
import { useSelector } from 'react-redux';

const Userhomecontents = () => {
  const location =useSelector((state)=>state.location)



  return (
    <Container style={{marginTop:'70px'}}>
      <Row style={{ height: '90vh', flexWrap: 'wrap' }}>
        {/* Left Side - Profile */}
        <Col style={{ height: '100%' }}>
          <Profileminicard />
        </Col>

        {/* Right Side */}
        <Col style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {location.value === "/" && (
            <>
              {/* Fixed Top Postminicard */}
              <div style={{ flexShrink: 0 }}>
                <Postminicard />
              </div>

              {/* Posts */}
              <div style={{
                flexGrow: 1,
                overflowY: 'auto',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <Postcard />
              </div>
            </>
          )}

          {location.value === "/comments" && (
            <div style={{
              flexGrow: 1,
              overflowY: 'auto',
              marginTop: 10
            }}>
              <CommentsView />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Userhomecontents;
