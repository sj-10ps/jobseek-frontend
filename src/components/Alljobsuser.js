import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Badge, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchalljobs } from '../redux/fetchjobsslice';
import { ip } from '../redux/ip';
import { appliedjobs, applyjob } from '../redux/applyjobslice';
import { useStatStyles } from '@chakra-ui/react';
import '../css/searchbar.css'

const Alljobsuser = () => {
    const dispatch=useDispatch()
    const {loading,success,data}=useSelector(state=>state.fetchjob)
    const {appliedoading,appliedsuccess,applieddata}=useSelector(state=>state.applyjob)
    const [alljobs,setalljobs]=useState([])
    const [filteredjobs,setfilteredjobs]=useState([])
    const userid=localStorage.getItem("userid")
    useEffect(()=>{
     dispatch(fetchalljobs())
    
     dispatch(appliedjobs(userid))
    },[dispatch])

    useEffect(()=>{
      if(data){
        setalljobs(data)
        setfilteredjobs(data)
      }
    },[data])
    const [search,setsearch]=useState('')

    const handleapplication=async(type,jobid)=>{

    await dispatch(applyjob({userid,type,jobid}))

    await dispatch(appliedjobs(userid))

   
    
    alert("applied")
    }


    const handlesearch=(e)=>{
        const jobtitle=e.target.value.toLowerCase()
        const searchedjobs=alljobs.filter(job=>job.title.toLowerCase().startsWith(jobtitle))
        setfilteredjobs(searchedjobs)

    }

    {loading&&appliedoading&&<div>"loading Details</div>}
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Available Jobs</h3>
       <div class="search-container">
    <input type="search" placeholder="Search Job Title..." class="search-input"  onChange={handlesearch}/>
    <span class="search-icon">&#128269;</span>
  </div>
      <Row>
        {filteredjobs && filteredjobs.length > 0 ? (
          filteredjobs.map((job, index) =>{
           let isapplied= applieddata.some(applied=>applied.job._id===job._id)
          return  (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
                <Card.Body>
                  {/* Company Info */}
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src={`${ip}/media/profile/${job.company.logo}`}
                      roundedCircle
                      style={{ width: 50, height: 50, marginRight: 15 }}
                      alt="Company Logo"
                    />
                    <div>
                      <h5 className="mb-0">{job.company.name}</h5>
                      <small className="text-muted">
                        {job.company.state}, {job.company.district}
                      </small>
                    </div>
                  </div>

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
                 
                <div className='d-flex gap-2'>
                     {isapplied&&<Button variant='primary'>already applied</Button>}
                     {!isapplied&&
                     <>
                      <Button variant="primary" className="w-100" onClick={()=>handleapplication('default',job._id)}>
                    Apply with default resume 
                  </Button>
                    <Button variant="primary" className="w-100" onClick={()=>handleapplication('custom',job._id)} >
                    Apply with generated resume 
                  </Button>
                     </>
                     
                     }
                 
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )})
        ) : (
          <p className="text-center text-muted">No jobs available.</p>
        )}
        
      </Row>
    </div>
  );
};

export default Alljobsuser;
