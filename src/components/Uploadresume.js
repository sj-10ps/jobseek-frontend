import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ip } from '../redux/ip';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleterecord } from '../redux/deleterecord';

const   ResumeCard = ({otheruserid}) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [ids,setids]=useState('')
  const [loading,setloading]=useState(false)
  const dispatch=useDispatch()
    useEffect(()=>{
    const fetchdata=async()=>{
        const formdata=new FormData()
        if(otheruserid){
            formdata.append('userid',otheruserid)
        }else{
             formdata.append('userid',localStorage.getItem("userid"))
        }
        
        const res=await axios.post(`${ip}/fetchresume`,formdata)
        setResumeUrl(`${res.data.data}`)

    }
    fetchdata()
  },[otheruserid])

  const handleUpload = async () => {

    setloading(true)
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('userid', localStorage.getItem('userid')); 
    

    try {
       const res=await axios.post(`${ip}/uploadresume`, formData);
       if(res.data.status==="ok"){
        setloading(false)
       }
       
      
    } catch (error) {
      alert('Upload failed: ' + error.message);
    }
  };


  return (
    <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
      <Card.Body>
          {!otheruserid&&
        <Card.Title>Upload Resume (PDF)</Card.Title>
        }
         {!otheruserid&&
        <Form.Group>
          
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
          />
        </Form.Group>
}
 {!otheruserid&&
 
       
        <Button className="mt-2" onClick={handleUpload} disabled={!resumeFile}>
           {loading?<Spinner/>:'Upload'}
 
        </Button>
} 

        {resumeUrl && (
          <div className="mt-3">
          
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              View Resume (PDF)
            </a>
                
                      {!otheruserid&&
                  <MdDelete
              style={{ cursor: 'pointer', fontSize: '24px', color: 'red' }}
              onClick={(e) => {
                e.preventDefault();
                const formdata=new FormData()
                formdata.append("id",ids)
                formdata.append("type","education")
                dispatch(deleterecord(formdata));
              }}
            />     
}  
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResumeCard;
