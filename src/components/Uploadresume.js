import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ip } from '../redux/ip';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleterecord } from '../redux/deleterecord';

const ResumeCard = ({otheruserid}) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [ids,setids]=useState('')
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
        setResumeUrl(`${ip}/media/resume/${res.data.data}`)

    }
    fetchdata()
  },[resumeUrl])

  const handleUpload = async () => {

    
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('userid', localStorage.getItem('userid')); 
    

    try {
       await axios.post(`${ip}/uploadresume`, formData);
       
      
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
          Upload
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
