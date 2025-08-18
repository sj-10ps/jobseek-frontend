import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { viewfeedback } from "../redux/feedbackslice";
import axios from "axios";
import { ip } from "../redux/ip";

const Viewfeedbacks = () => {
  const dispatch = useDispatch();
  const { viewloading, viewsuccess, feedbackdata } = useSelector(
    (state) => state.feedback
  );
  const [reply,setreply]=useState([])

  useEffect(() => {
    dispatch(viewfeedback());
  }, [dispatch]);

  const handlereply=async(fbid,email)=>{
   const selectedreply=reply[fbid]
   await axios.post(`${ip}/replyfeedback`,{fbid,email,reply:selectedreply})
   setreply((prev)=>({...prev,[fbid]:""}))
   dispatch(viewfeedback())
  }

  return (
    <Container style={{ marginTop: "30px", background: "white", padding: 20, borderRadius: 8 }}>
      <h3 style={{ marginBottom: "20px" }}>User Feedbacks</h3>

      {viewloading && <Spinner animation="border" />}

      {viewsuccess && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Feedback</th>
        
              <th>Email</th>
              <th>Created At</th>
              <th>Reply</th>
            </tr>
          </thead>
          <tbody>
            {feedbackdata.map((fb, index) => (
              <tr key={fb._id}>
                <td>{index + 1}</td>
                <td>{fb.feedback}</td>
               
                <td>{fb.sender.email || "N/A"}</td>
                <td>{new Date(fb.createdAt).toLocaleString()}</td>
                <td>
                    <input type="text" value={reply[fb._id]||""} onChange={(e)=>setreply((prev)=>({...prev,[fb._id]:e.target.value}))}></input>
                    <Button onClick={()=>handlereply(fb._id,fb.sender.email)}>Reply</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Viewfeedbacks;
