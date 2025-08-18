import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadfeedback } from "../redux/feedbackslice";

const Feedbackform=()=> {
  const [feedback, setFeedback] = useState("");
  const logid=localStorage.getItem("logid")
  const dispatch=useDispatch()
  const {loading,success}=useSelector(state=>state.feedback)


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(feedback,logid)
    await dispatch(uploadfeedback({feedback,logid}))
    setFeedback("");
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "30px" ,backgroundColor:'white',padding:30,borderRadius:8}}>
      <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3" controlId="feedbackTextarea">
          <Form.Label style={{color:'black',fontWeight:'bold'}}>Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Type your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!feedback.trim()||loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Feedbackform;
