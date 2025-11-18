import React, { useEffect, useState } from 'react';
import { Table, Container, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { ip } from '../redux/ip';

const AdminViewallusers = () => {
  const [users, setUsers] = useState([]);
  const [allusers,setAllusers]=useState([])
  const [refresh,setrefresh]=useState(false)

  useEffect(() => {
  
    const fetchUsers = async () => {
   
        const response = await axios.get(`${ip}/getallusers`); 
        setUsers(response.data);
        setAllusers(response.data);
      
    };

    fetchUsers();
  }, [refresh]);


    const setsearchdata=(e)=>{
     const newdata=allusers.filter(user=>user.firstname.toLowerCase().startsWith(e.target.value.toLowerCase()))
     setUsers(newdata)
  }
  return (
    <Container className="my-4">
       <input type='text' onChange={ setsearchdata} placeholder='Search User....'  style={{position:'sticky',top:0,zindex:1,borderRadius:4,padding:10}}></input>
      <h2 className="text-center mb-4">All Registered Users</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Age</th>
              <th>Gender</th>
              <th>District</th>
              <th>State</th>
              <th>Phone</th>
              <th>LinkedIn</th>
              <th>GitHub</th>
              <th>Summary</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <Image
                    src={`${user.image} `|| '/default-user.png'}
                    roundedCircle
                    width={50}
                    height={50}
                    alt="User"
                  />
                </td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.professionaltitle || '-'}</td>
                <td>{user.age || '-'}</td>
                <td>{user.gender || '-'}</td>
                <td>{user.district || '-'}</td>
                <td>{user.state || '-'}</td>
                <td>{user.phone || '-'}</td>
                <td>
                  {user.linkedin ? (
                    <a href={user.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  ) : '-'}
                </td>
                <td>
                  {user.github ? (
                    <a href={user.github} target="_blank" rel="noreferrer">GitHub</a>
                  ) : '-'}
                </td>
                <td>{user.summary || '-'}</td>
                <td>{new Date(user.createdat).toLocaleDateString()}</td>
                <td><Button onClick={async()=>{
                  const confirmdelete=window.confirm("are you sure to delete?");
                  confirmdelete&&await axios.post(`${ip}/deleteuser`,{userid:user._id})
                    setrefresh(prev=>!prev)
                 
                  }} >Delete user</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminViewallusers;
