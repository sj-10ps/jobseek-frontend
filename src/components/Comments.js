import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Image, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setLocation } from '../redux/LocationSlice';
import { useDispatch, useSelector } from 'react-redux';
import  { fetchcomment,uploadcomment } from '../redux/Uploadcomment';

const CommentsView = () => {
    const dispatch=useDispatch()
    const postid=useSelector((state)=>state.location.id)
    const {loading,success,fetchloading,fetchsuccess,data}=useSelector((state)=>state.uploadcomment)


    const [comment,setComment]=useState('')
    
  const handlesubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('comment',comment)
    formdata.append('logid',localStorage.getItem('logid'))
    formdata.append('postid',postid)
    await dispatch(uploadcomment(formdata))
  }

  useEffect(()=>{
    dispatch(fetchcomment(postid))
  },[success,dispatch,postid])



  return (
    <Card className="mt-4 p-4 shadow-sm rounded" style={{ width: '100%' }}>
      <Card.Header style={{ fontWeight: 'bold', backgroundColor: '#f4f4f4',position:'sticky',top:1,zIndex:1 ,display:'flex',flexDirection:'column'}}>
       <div style={{marginRight:5,cursor:'pointer'}} onClick={()=>dispatch(setLocation('/'))}>🔙Comments</div>
          <Form onSubmit={handlesubmit}>
  <Form.Group controlId="exampleInput">
    
    <Form.Control type="text" placeholder="Type comment..." onChange={(e)=>setComment(e.target.value)} />
    <Button type='submit' className='btn btn-primary mt-2 w-100'>post</Button>
  </Form.Group>
        </Form>
        
      </Card.Header>
      {fetchloading&&<div>loading comments...</div>}
      {fetchsuccess&&<>  <ListGroup variant="flush">
        {data && data.length > 0 ? (
          data.map((comment, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-start border-0 border-bottom">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                style={{ width: 40, height: 40, fontSize: 14 }}
              >
                {comment.comment}
              </div>
              <div>
                <div className="fw-bold">{comment.comment}</div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {new Date(comment.comment).toLocaleString()}
                </div>
                <div className="mt-1">{comment.comment}</div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No comments to display.</ListGroup.Item>
        )}
      </ListGroup></>}
    
    </Card>
  );
};

export default CommentsView;
