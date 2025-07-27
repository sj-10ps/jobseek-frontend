import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchprofile } from '../redux/Profilefetch';
import { useEffect } from 'react';
import { ip } from '../redux/ip';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const   Profileminicard = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userid=localStorage.getItem("userid")
    console.log(userid)

      const { loading,success, data } = useSelector((state) => state.profile);
      
    
    useEffect(()=>{
       dispatch(fetchprofile(userid))
    },[userid, dispatch])

 
  

  return (
     <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top"  /> */}
      <Card.Body>

       
        {loading&& <p>Loading profile...</p>}
        {success&&<>
         <Card.Title> <Image src={data.image==="pending"?`logo512.png`:`${ip}/media/profile/${data.image}`} roundedCircle style={{width:100,height:100}} /></Card.Title>
         <Card.Text className='text-primary fs-4'>
          
          {data.firstname} {data.lastname}
        
        </Card.Text>
          <Card.Text className='fs-8'>
          
          Email:{data.email}
        
        </Card.Text>
       
        </>}
       
        <Button variant="primary" onClick={()=>navigate('/userProfile')}>View profile</Button>
      </Card.Body>
    </Card>
  )
}

export default Profileminicard
