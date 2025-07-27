import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { Card } from 'react-bootstrap';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { registerCompany } from '../redux/companySlice';
import Spinner from 'react-bootstrap/Spinner';

const Companyreg = () => {
  const [password, setPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.company);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Minimum 3 letters required").required('Name is required'),
    email: Yup.string().email("Invalid email").required('Email is required'),
    district: Yup.string().required('District is required'),
    state: Yup.string().required('State is required'),
    location: Yup.string().notRequired(),
    industry: Yup.string().required("Industry is required").min(6, "Minimum 6 characters required"),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    logo: Yup.mixed().nullable(),
    linkedin: Yup.string().url('Invalid LinkedIn URL').notRequired(),
    website: Yup.string().url('Invalid website URL').notRequired(),
    username: Yup.string().min(3, "Minimum 3 letters").required("Username is required"),
    password: Yup.string().min(6, "Minimum 6 letters").required("Password is required"),
  });

  const initialValues = {
    name: '',
    email: '',
    district: '',
    state: '',
    location: '',
    phone: '',
    logo: '',
    website: '',
    linkedin: '',
    industry: '',
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formdata = new FormData();
    Object.keys(values).forEach((key) => {
      formdata.append(key, values[key]);
    });

    await dispatch(registerCompany(formdata));
    
    resetForm();
  };

  return (
    <Card bg="light" style={{ width: '500px', margin: 'auto' }} className="m-4">
      <Card.Header className="text-center fw-bold fs-4">Company Registration</Card.Header>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Card.Body>
            <Form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Field name='name' placeholder='Enter company name' className='form-control' />
                <ErrorMessage name="name" component="div" className="text-danger" />

                <Field name='email' placeholder='Enter email' className='form-control' />
                <ErrorMessage name="email" component="div" className="text-danger" />

                <Field name='district' placeholder='Enter district' className='form-control' />
                <ErrorMessage name="district" component="div" className="text-danger" />

                <Field name='location' placeholder='Enter location' className='form-control' />
                <ErrorMessage name="location" component="div" className="text-danger" />

                <Field name='state' placeholder='Enter state' className='form-control' />
                <ErrorMessage name="state" component="div" className="text-danger" />

                <Field name='phone' placeholder='Enter phone number' className='form-control' />
                <ErrorMessage name="phone" component="div" className="text-danger" />

                <input
                  type="file"
                  name="logo"
                  className="form-control"
                  onChange={(e) => setFieldValue("logo", e.currentTarget.files[0])}
                />
                <ErrorMessage name="logo" component="div" className="text-danger" />

                <Field name='industry' placeholder='Enter industry' className='form-control' />
                <ErrorMessage name="industry" component="div" className="text-danger" />

                <Field name='linkedin' placeholder='LinkedIn URL' className='form-control' />
                <ErrorMessage name="linkedin" component="div" className="text-danger" />

                <Field name='website' placeholder='Website URL' className='form-control' />
                <ErrorMessage name="website" component="div" className="text-danger" />

                

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Field name='password' placeholder='Enter password' type={password ? 'text' : 'password'} className='form-control' />
                  <button type="button" className='btn btn-outline-secondary' onClick={(e) => {e.preventDefault();setPassword(!password)}} style={{ marginLeft: '10px' }}>
                    {password ? 'Hide' : 'Show'}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />

                <button type="submit" className='btn btn-primary w-100 mt-3' disabled={loading}>
              
                  {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                </button>
                     
              </div>
            </Form>
          </Card.Body>
        )}
      </Formik>
    </Card>
  );
};

export default Companyreg;
