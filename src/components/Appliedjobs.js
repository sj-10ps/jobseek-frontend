import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Badge, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { appliedjobs } from '../redux/applyjobslice';
import { ip } from '../redux/ip';

const Appliedjobs = () => {
  const dispatch = useDispatch();
  const userid = localStorage.getItem('userid');
  const [compaint,setcompaint]=useState(false)

  const { appliedloading, appliedsuccess, applieddata } = useSelector(state => state.applyjob);
 
  useEffect(() => {
    if (userid) {
      dispatch(appliedjobs(userid));
    }
  }, [dispatch, userid]);

  const handleclick=()=>{
    
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Applied Jobs</h3>
      {appliedloading && <p className="text-center text-muted">Loading applied jobs...</p>}
      <Row>
        {appliedsuccess && applieddata.length > 0 ? (
          applieddata.map((application, index) => {
            const job = application.job;
            const company = job?.company;

            return (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="shadow-sm" style={{ borderRadius: '10px' }} onClick={handleclick}>
                  <Card.Body>
                    {/* Company Info */}
                    {company && (
                      <div className="d-flex align-items-center mb-3">
                        <Image
                          src={`${ip}/media/profile/${company.logo}`}
                          roundedCircle
                          style={{ width: 50, height: 50, marginRight: 15 }}
                          alt="Company Logo"
                        />
                        <div>
                          <h5 className="mb-0">{company.name}</h5>
                        </div>
                      </div>
                    )}

                    {/* Job Info */}
                    <Card.Title>{job.title}</Card.Title>
                    <Badge bg="info" className="mb-2">{job.jobtype}</Badge>
                    <Card.Text>
                      <strong>Experience:</strong> {job.experience}<br />
                      <strong>Salary:</strong> {job.salaryrange}<br />
                      <strong>Status:</strong> {job.status}<br />
                      <strong>Applicants:</strong> {job.applicantscount}
                    </Card.Text>

                    {/* Skills */}
                    <div className="mb-2">
                      <strong>Skills:</strong>
                      <div>
                        {job.skills.map((skill, idx) => (
                          <Badge bg="secondary" key={idx} className="me-1">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '14px', color: '#555' }}>
                      {job.description.length > 100
                        ? job.description.substring(0, 100) + '...'
                        : job.description}
                    </p>

                    {/* Action */}
                    <div className="d-flex gap-2">
                      <Button variant="success" disabled>
                        ✅ {application.status}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p className="text-center text-muted">No applied jobs found.</p>
        )}
      </Row>
    </div>
  );
};

export default Appliedjobs;
