import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const UserIntro = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
     <Card className="w-100 w-md-75 w-lg-50" style={{ maxWidth: '30rem' ,margin:'100px'}}>
  <Card.Img variant="top" src={`jobseek.png`} />
  <Card.Body>
    <Card.Title className="fw-bold text-primary">Unlock Your Career Potential</Card.Title>
    <Card.Text>
      Discover your next opportunity with ease. Whether you're a fresher or a seasoned professional,
      our platform connects you with the right jobs, top companies, and career resources — all in one place.
      <br/><br/>
      Take control of your future. Join us today!
    </Card.Text>
  <Link to={'/userhome'}><Button style={{width:'100%'}}>Go home</Button> </Link>  
  </Card.Body>
</Card>
</div>


  )
}

export default UserIntro
