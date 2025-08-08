import { ErrorMessage, Field, Formik, Form } from 'formik';
import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { uploadeducation } from '../redux/EducationSlice';
import { setLocation } from '../redux/LocationSlice';
import { fetchdetails } from '../redux/Personaldetailsslice';

const Educationform = () => {

    const dispatch=useDispatch()
    const {loading,success}=useSelector((state)=>state.education)

  const initialValues = {
    institute: '',
    field: '',
    degree: '',
    startdate: '',
    enddate: '',
    extra: '',
  };

  const validationSchema = Yup.object({
    institute: Yup.string().required('Institute is required'),
    field: Yup.string().required('Field of study is required'),
    degree: Yup.string().required('Degree is required'),
    startdate: Yup.date().required('Start date is required'),
    enddate: Yup.date().required('End date is required'),
    extra: Yup.string(),
  });

  const handleSubmit = async(values) => {
    const formData=new FormData()
    
    for (let value in values){
      formData.append(value,values[value])
    }
    formData.append("userid",localStorage.getItem('userid'))
    dispatch(uploadeducation(formData))
    await dispatch(fetchdetails(localStorage.getItem('userid')))
    dispatch(setLocation('/'))


  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form encType='multipart/form-data'>
        <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}> 
            <Card.Body>
              <h5 className='text-center mb-4'>Education Details</h5>

              <Row className='mb-3'>
                <Col md={6}>
                  <label>Institute</label>
                  <Field name="institute" className="form-control" type="text" />
                  <ErrorMessage name="institute" component="div" className="text-danger" />
                </Col>
                <Col md={6}>
                  <label>Field</label>
                  <Field name="field" className="form-control" type="text" />
                  <ErrorMessage name="field" component="div" className="text-danger" />
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col md={6}>
                  <label>Degree</label>
                  <Field name="degree" className="form-control" type="text" />
                  <ErrorMessage name="degree" component="div" className="text-danger" />
                </Col>
                <Col md={6}>
                  <label>Description</label>
                  <Field name="extra" className="form-control" type="text" />
                  <ErrorMessage name="extra" component="div" className="text-danger" />
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col md={6}>
                  <label>Start Date</label>
                  <Field name="startdate" className="form-control" type="date" />
                  <ErrorMessage name="startdate" component="div" className="text-danger" />
                </Col>
                <Col md={6}>
                  <label>End Date</label>
                  <Field name="enddate" className="form-control" type="date" />
                  <ErrorMessage name="enddate" component="div" className="text-danger" />
                </Col>
              </Row>

              <div className="text-center">
                <Button type="submit" variant="primary" disabled={loading}>Submit</Button>
                 <Button
                                variant="secondary"
                                className="ms-2"
                                onClick={() => dispatch(setLocation('/'))}
                              >
                                Cancel
                              </Button>
              </div>
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default Educationform;
