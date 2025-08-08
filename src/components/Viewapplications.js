import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { closejob, fetchjobsbyid } from '../redux/uploadjobslice';
import { viewapplicant, viewselectedapplicant } from '../redux/viewapplicantSlice';
import ApplicantModal from './Viewapplicants';
import Selectedapplicants from './Selectedapplicants';



const Viewapplications = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.uploadjob); 
  const companyId = localStorage.getItem('userid');
 const {applicantloading,applicantsuccess,applicantdata,selecteddata}=useSelector(state=>state.viewapplicant)
 const [viewapplicants,setviewapplicants]=useState(false)
 const [viewselectedapplicants,setviewselectedapplicants]=useState(false)


  const handleCloseJob = async(jobId) => {
    await dispatch(closejob(jobId))
     await dispatch(fetchjobsbyid(companyId))
    alert('Job closed successfully!');
  };
    useEffect(() => {
    dispatch(fetchjobsbyid(companyId)); // Fetch jobs for this company
  }, [dispatch, companyId]);

  if (loading) {
    return <div className="text-center mt-5">Loading jobs...</div>;
  }

  const viewapplicatant=async(jobid)=>{
    await dispatch(viewapplicant({jobid}))
  
     setviewapplicants(true)
    
   

  }

  const viewselectedapplicatant=async(jobid)=>{
    await dispatch(viewselectedapplicant({jobid}))
    setviewselectedapplicants(true)
  }

    const activeJobs = data?.filter((job) => job.status?.toLowerCase() === 'open') || [];
  const closedJobs = data?.filter((job) => job.status?.toLowerCase() === 'closed') || [];

  return (
     <>
    <Container className="mt-4" style={{filter:viewapplicants?'blur(5px)':'none',transition: 'filter 0.3s ease' }}>

      <h2 className="mb-4 text-center">Your Uploaded Jobs</h2>
      <Row className='justify-content-between'>
        {/* ✅ Active Jobs Column */}
        <Col md={6} style={{maxHeight:'90vh',overflowY:'scroll',scrollbarWidth:'none'}}>
          <h4 className="mb-3 text-success">Active Jobs</h4>
          {activeJobs.length > 0 ? (
            activeJobs.map((job) => (
              <Card className="shadow mb-4" key={job._id} >
                <Card.Body onClick={()=>viewapplicatant(job._id)}  style={{cursor:'pointer'}}>
                  <Card.Title>{job.title}</Card.Title>
                  <Badge bg="success">{job.status}</Badge>
                  <Card.Text className="mt-2">
                    <strong>Type:</strong> {job.jobtype}
                    <br />
                    <strong>Experience:</strong> {job.experience}
                    <br />
                    <strong>Salary:</strong> {job.salaryrange}
                    <br />
                    <strong>Skills:</strong> {job.skills.join(', ')}
                    <br />
                    <strong>Description:</strong> {job.description}...
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <small className="text-muted">
                    Applicants: {job.applicantscount || 0}
                  </small>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCloseJob(job._id)}
                  >
                    Close Job
                  </Button>
                </Card.Footer>
              </Card>
            ))
          ) : (
            <p>No active jobs available.</p>
          )}
        </Col>

        {/* ✅ Closed Jobs Column */}
        <Col md={6} style={{maxHeight:'90vh',overflowY:'scroll',scrollbarWidth:'none'}}>
          <h4 className="mb-3 text-secondary">Closed Jobs</h4>
          {closedJobs.length > 0 ? (
            closedJobs.map((job) => (
              <Card className="shadow mb-4" key={job._id} >
                <Card.Body onClick={()=>viewselectedapplicatant(job._id)}  style={{cursor:'pointer'}} > 
                  <Card.Title>{job.title}</Card.Title>
                  <Badge bg="secondary">{job.status}</Badge>
                  <Card.Text className="mt-2">
                    <strong>Type:</strong> {job.jobtype}
                    <br />
                    <strong>Experience:</strong> {job.experience}
                    <br />
                    <strong>Salary:</strong> {job.salaryrange}
                    <br />
                    <strong>Skills:</strong> {job.skills.join(', ')}
                    <br />
                    <strong>Description:</strong> {job.description}...
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Applicants: {job.applicantscount || 0}
                  </small>
                </Card.Footer>
              </Card>
            ))
          ) : (
            <p>No closed jobs available.</p>
          )}
        </Col>
      </Row>
    </Container>

    {viewapplicants&&(
      <ApplicantModal applicantdata={applicantdata} applicantloading={applicantloading} onClose={()=>setviewapplicants(false)}/>
    )}
 {viewselectedapplicants && (

        <Selectedapplicants applicantdata={selecteddata} applicantloading={applicantloading} onClose={()=>setviewselectedapplicants(false)}/>
      )}
        

 </>


  );
};

export default Viewapplications;


