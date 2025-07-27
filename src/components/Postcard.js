import React, { useEffect, useReducer, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { ip } from '../redux/ip'; // assuming you have IP address stored
import { postfetch } from '../redux/Postslice';
import { useDispatch, useSelector } from 'react-redux';
import { updatelikes } from '../redux/PostingSlice';
import { useNavigate } from 'react-router-dom';
import { setCommentid, setid, setLocation } from '../redux/LocationSlice';

const Postcard = () => {
     const dispatch=useDispatch()
     const userid=localStorage.getItem("logid")
     const {data,loading,success}=useSelector((state)=>state.postfetch)
     
     useEffect(()=>{
        dispatch(postfetch(userid))

     },[userid])

     const [likecount,setLikecount]=useState({})
     const [likestatus,setLikestatus]=useState({})
   
    const handlenavigation=(itemid)=>{
      dispatch(setLocation('/comments'))
      dispatch(setid(itemid))
    }


     useEffect(()=>{
      if(success){
        const initiallikes={}
        const initialstatus={}
        data.forEach((item)=>{
          initiallikes[item._id]=item.likes||0
          initialstatus[item._id]=item.likedby.includes(localStorage.getItem("logid"))
        })
        setLikecount(initiallikes)
        setLikestatus(initialstatus)
        
        
      }
     },[data,success])

    

    const togglelike=async(postid)=>{
      const isliked=likestatus[postid]
      setLikestatus((prev)=>({
        ...prev,
        [postid]:!isliked
      }))

      setLikecount((prev)=>({
        ...prev,
        [postid]:isliked?prev[postid]-1:prev[postid]+1 
      }))
      
      await dispatch(updatelikes({postid:postid,isliked:!isliked,logid:localStorage.getItem("logid")}))
    }


    if(loading) return <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>Loading details</div>

  return (
   
     <>
       
       <h4 style={{textAlign:'center',backgroundColor:'white',color:'black',width:"90%",borderRadius:8,marginLeft:15,padding:10,position:'sticky',top:0,zIndex:1}}>Your posts</h4>
      {success&&
        
        data.map((item)=>(
          <Card className="m-3 shadow" style={{ width: '90%' }}>
          <Card.Img 
          variant="top" 
          src={`${ip}/media/post/${item.media}`} 
          alt="Post Media" 
          style={{ maxHeight: '300px', objectFit:'contain' }}
        />
 

      <Card.Body>
      
        <Card.Text className="fs-5">{item.description}</Card.Text>

      
        <div className="d-flex justify-content-between align-items-center">
          <div onClick={()=>togglelike(item._id)} style={{display:'flex',gap:'5px',cursor:'pointer'}}>
           {likestatus[item._id]?<>❤️</> :<>♡</>} 
             <strong>{likecount[item._id]}</strong> Likes
          </div>
          <div onClick={()=>handlenavigation(item._id)} style={{display:'flex',gap:'5px',cursor:'pointer'}}>
           
             💬
          </div>

      
        </div>
      </Card.Body>

   
      <Card.Footer className="text-muted">
        Posted on: {new Date(item.createdAt).toLocaleDateString()}

      </Card.Footer>
            </Card>
        ))}
         
      
      </>
       

  );
};

export default Postcard
