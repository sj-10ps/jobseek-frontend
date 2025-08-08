import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  Button,
  Form as BootstrapForm,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../redux/LocationSlice';
import { updateProfile } from '../redux/userSlice';
import { fetchprofile } from '../redux/Profilefetch';
import { fetchdetails } from '../redux/Personaldetailsslice';

const UserForm = () => {
  const dispatch=useDispatch()
  const userid=useSelector((state)=>state.location.id)
  const {loading,success,profiledata}=useSelector((state)=>state.userdetails)
  console.log(profiledata)
  

   useEffect(()=>{
    dispatch(fetchdetails(userid))
  },[dispatch,userid])
 const initialValues = {
  firstname: profiledata?.firstname || '',
  lastname: profiledata?.lastname || '',
  professionaltitle: profiledata?.professionaltitle || '',
  email: profiledata?.email || '',
  age: profiledata?.age || '',
  gender: profiledata?.gender || '',
  district: profiledata?.district || '',
  state: profiledata?.state || '',
  phone: profiledata?.phone || '',
  linkedin: profiledata?.linkedin || '',
  github: profiledata?.github || '',
  summary:profiledata?.summary||''
 
};

  

  const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Enter valid 10-digit phone'),
    linkedin: Yup.string().url('Enter valid LinkedIn URL'),
    github: Yup.string().url('Enter valid GitHub URL'),
  });

  const handleSubmit =async (values, { setSubmitting }) => {
    const formData = new FormData();
    for (let key in values) {
    
        formData.append(key, values[key]);
      
    }
    formData.append('userid',localStorage.getItem("userid"))
    setSubmitting(false);
    dispatch(updateProfile(formData))
    dispatch(setLocation('/userProfile'))
    await dispatch(fetchdetails(userid))
    
  };
 
  if (loading) {
  return <div>Loading...</div>; 
}

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      
    >
      {({ setFieldValue, isSubmitting }) => (
       <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
          <Card.Body>
            <Card.Title className=" ">User Registration</Card.Title>
            <Form encType="multipart/form-data">
              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>First Name</BootstrapForm.Label>
                    <Field
                      name="firstname"
                      className="form-control"
                      type="text"
                      placeholder={''}
                    />
                    <ErrorMessage name="firstname" component="div" className="text-danger small" />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                    <Field
                      name="lastname"
                      className="form-control"
                      type="text"
                    />
                    <ErrorMessage name="lastname" component="div" className="text-danger small" />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field name="email" className="form-control" type="email" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
                <BootstrapForm.Label>Professional Title</BootstrapForm.Label>
                <Field name="professionaltitle" className="form-control" type="text" />
                <ErrorMessage name="professionaltitle" component="div" className="text-danger small" />
                <BootstrapForm.Label>Summary</BootstrapForm.Label>
                <Field name="summary" className="form-control" type="text" />
                <ErrorMessage name="summary" component="div" className="text-danger small" />
              </BootstrapForm.Group>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Age</BootstrapForm.Label>
                    <Field name="age" className="form-control" type="number" />
                    <ErrorMessage name="age" component="div" className="text-danger small" />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Gender</BootstrapForm.Label>
                    <Field name="gender" as="select" className="form-control">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-danger small" />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>State</BootstrapForm.Label>
                    <Field name="state" className="form-control" type="text" />
                    <ErrorMessage name="state" component="div" className="text-danger small" />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>District</BootstrapForm.Label>
                    <Field name="district" className="form-control" type="text" />
                    <ErrorMessage name="district" component="div" className="text-danger small" />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Phone</BootstrapForm.Label>
                <Field name="phone" className="form-control" type="text" />
                <ErrorMessage name="phone" component="div" className="text-danger small" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>LinkedIn</BootstrapForm.Label>
                <Field name="linkedin" className="form-control" type="text" />
                <ErrorMessage name="linkedin" component="div" className="text-danger small" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>GitHub</BootstrapForm.Label>
                <Field name="github" className="form-control" type="text" />
                <ErrorMessage name="github" component="div" className="text-danger small" />
              </BootstrapForm.Group>

            

              <div className="d-flex">
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                 <Button
                                variant="secondary"
                                className="ms-2"
                                onClick={() => dispatch(setLocation('/userProfile'))}
                              >
                                Cancel
                              </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Formik>
  );
};

export default UserForm;
