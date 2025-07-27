import Card from 'react-bootstrap/Card';
import { Button, Image } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdetails } from '../redux/Personaldetailsslice';
import { ip } from '../redux/ip';
import { TfiUppercase } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { setid, setLocation } from '../redux/LocationSlice';
import UserForm from './ProfileUpdateCard';
import SimpleImageUpload from './UpdateImage';

const UserProfile =()=> {
    const dispatch=useDispatch()
    const userid=localStorage.getItem("userid")
    const {value}=useSelector((state)=>state.location)
    const {loading,success,profiledata,certificatedata,educationdata,experiencedata,skillsdata}=useSelector((state)=>state.userdetails)
    useEffect(()=>{
      dispatch(fetchdetails(userid))
      console.log(userid)
    },[dispatch,value])

 


  return (
    <div className="d-flex flex-column m-5 gap-1 pt-3 justify-content-start align-items-start overflow-scroll " style={{height:"100%",marginBottom:'300px'}}>
    
    <Card style={{ width: '30rem' }}>
      {loading&&<div>Loading details...</div>}
        
      {success&&(
              <Card.Body>
                 {value==='/updateimage'?<SimpleImageUpload/> : <Card.Title onClick={()=>dispatch(setLocation('/updateimage'))} style={{display:'flex',flexDirection:'column'}}><Image src={profiledata.image!=='pending'?`${ip}/media/profile/${profiledata.image}`:`logo512.png`} roundedCircle  style={{height:'100px',width:'100px'}}/><span style={{position:'absolute',left:'120px',top:'80px'}}>+</span></Card.Title>}
       
        <Card.Subtitle className="mb-2 text-muted">Personal details</Card.Subtitle>
        <Card.Text>
         {`${profiledata.firstname}`.toUpperCase()} {`${profiledata.lastname}`.toUpperCase()}
       
        </Card.Text>
          <Card.Text>{profiledata.email}</Card.Text>
          <Card.Text>{profiledata.phone||<div className='text-secondary'>add phone no...</div>}</Card.Text>
         <div className='d-flex gap-4'>
        <Card.Text>{profiledata.gender||<div className='text-secondary'>add gender...</div>}</Card.Text>
        <Card.Text>{profiledata.age||<div className='text-secondary'>add age...</div>}</Card.Text>
        </div>
        <div className='d-flex gap-4'>
        <Card.Text>{profiledata.district||<div className='text-secondary'>add district...</div>}</Card.Text>
        <Card.Text>{profiledata.state||<div className='text-secondary'>add state...</div>}</Card.Text>
        </div>
        <Card.Link href={profiledata.linkedin} style={{cursor:'pointer'}} >linkedin</Card.Link>
          <Card.Link href={profiledata.github} style={{cursor:'po'}}>github</Card.Link>
          <Card.Footer>
          <Button onClick={(e)=>{e.preventDefault();dispatch(setLocation("/profileForm"));dispatch(setid(profiledata._id))}} >Update Personal Details</Button>
          </Card.Footer>
      </Card.Body>
      
      )}


      {value==="/profileForm"&&<UserForm/>}
   


    </Card>


    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>


    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title><Image src="holder.js/171x180" roundedCircle /></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>


    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title><Image src="holder.js/171x180" roundedCircle /></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>



    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title><Image src="holder.js/171x180" roundedCircle /></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>


    <Card style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title><Image src="holder.js/171x180" roundedCircle /></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
</div>
  );
}

export default UserProfile;