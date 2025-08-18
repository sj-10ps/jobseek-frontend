import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Adminintro = () => {
  const navigate=useNavigate()
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h2>Welcome, Admin!</h2>
              </Card.Title>
              <Card.Text className="text-center mb-4">
                As an administrator, you have access to the core management features of the JobSeek platform:
              </Card.Text>
              <Row>
                <Col md={3} className="text-center">
                  <Card className="p-3 shadow-sm h-100">
                    <h5>👤 View All Users</h5>
                    <p className="text-muted">Monitor and manage all job seekers on the platform.</p>
                    <Button variant="primary" size="sm" onClick={()=>navigate('/adminviewallusers')}>Go to Users</Button>
                  </Card>
                </Col>
                <Col md={3} className="text-center">
                  <Card className="p-3 shadow-sm h-100">
                    <h5>🏢 View All Companies</h5>
                    <p className="text-muted">Access and verify all company profiles.</p>
                    <Button variant="primary" size="sm" onClick={()=>navigate('/adminviewallcompanies')}>Go to Companies</Button>
                  </Card>
                </Col>
                <Col md={3} className="text-center">
                  <Card className="p-3 shadow-sm h-100">
                    <h5>✅ Approve Requests</h5>
                    <p className="text-muted">Approve pending company registration requests.</p>
                    <Button variant="primary" size="sm"  onClick={()=>navigate('/viewcompanyrequests')}>Review Requests</Button>
                  </Card>
                </Col>
                 <Col md={3} className="text-center">
                  <Card className="p-3 shadow-sm h-100">
                    <h5>👁️ View Feedback</h5>
                    <p className="text-muted">View feedbacks from User</p>
                    <Button variant="primary" size="sm"  onClick={()=>navigate('/viewfeedbacks')}>View feedbacks</Button>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Adminintro;
