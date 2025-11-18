import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, ButtonToolbar } from 'react-bootstrap';
import { ip } from '../redux/ip';

const Adminviewallcompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [allcompanies,setAllcompanies]=useState([])
  const [refresh,setrefresh]=useState(false)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${ip}/getallcompanies`);
        setCompanies(response.data);
        setAllcompanies(response.data);
      } catch (err) {
        console.error('Error fetching companies:', err);
      }
    };

    fetchCompanies();
  }, [refresh]);

  const setsearchdata=(e)=>{
     const newdata=allcompanies.filter(company=>company.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
     setCompanies(newdata)
  }

  return (
    <Container className="my-4">
       <input type='text' onChange={ setsearchdata} placeholder='Search company....'  style={{position:'sticky',top:0,zindex:1,borderRadius:4,padding:10}}></input>
      <h2 className="text-center mb-4">All Registered Companies</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
               <th>Company Logo</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Contact</th>
              
              <th>Address</th>
              <th>Description</th>
              <th>Website</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index}>
                 <td><img src={`${company.logo}`} style={{height:50}}/></td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.phone}</td>
                <td>{company.state},{company.district},{company.location}</td>
                <td>{company.description}</td>
                <td>
                  {company.website ? (
                    <a href={company.website} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  ) : '-'}
                </td>
                <td>
                  <span className={`badge ${company.status === 'approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {company.status}
                  </span>
                </td>
                <td><Button onClick={async()=>{
                  const confirmdelete=window.confirm("are you sure to delete?");
                  confirmdelete&&await axios.post(`${ip}/deletecompany`,{comid:company._id})
                  setrefresh(prev=>!prev)
                  }} >Delete Company</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Adminviewallcompanies;
