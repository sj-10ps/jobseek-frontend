import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Form as BootstrapForm, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { postExperience } from '../redux/experiencePostSlice' // adjust to your actual slice
import { setLocation } from '../redux/LocationSlice' // adjust if needed
import { formatProdErrorMessage } from '@reduxjs/toolkit'
import { uploadexperience } from '../redux/experiencePostSlice'

const ExperienceForm = () => {
  const dispatch = useDispatch()
  const {loading}=useSelector((state)=>state.experience)

  const initialValues = {
    company: '',
    role: '',
    startdate: '',
    enddate: '',
    location: '',
    description: ''
  }

  const validationSchema = Yup.object({
    company: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    startdate: Yup.date().required('Required'),
    enddate: Yup.date()
      .required('Required')
      .min(Yup.ref('startdate'), 'End date can’t be before start date'),
    location: Yup.string().required('Required'),
    description: Yup.string().required('Required')
  })

  const handleSubmit = (values, { resetForm }) => {
    const formData=new FormData()
    for (let i in values){
       formData.append(i,values[i])
    }
    formData.append("userid",localStorage.getItem("userid"))
    dispatch(uploadexperience(formData))
    resetForm()
    dispatch(setLocation('/')) 
  }

  return (
    <Card style={{ width: '28rem', marginTop: 10 }}>
      <Card.Body>
        <Card.Title>Add Experience</Card.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <BootstrapForm.Group className="mb-2">
                <BootstrapForm.Label>Company</BootstrapForm.Label>
                <Field name="company" className="form-control" />
                <ErrorMessage name="company" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-2">
                <BootstrapForm.Label>Role</BootstrapForm.Label>
                <Field name="role" className="form-control" />
                <ErrorMessage name="role" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-2">
                <BootstrapForm.Label>Start Date</BootstrapForm.Label>
                <Field type="date" name="startdate" className="form-control" />
                <ErrorMessage name="startdate" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-2">
                <BootstrapForm.Label>End Date</BootstrapForm.Label>
                <Field type="date" name="enddate" className="form-control" />
                <ErrorMessage name="enddate" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-2">
                <BootstrapForm.Label>Location</BootstrapForm.Label>
                <Field name="location" className="form-control" />
                <ErrorMessage name="location" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Description</BootstrapForm.Label>
                <Field as="textarea" name="description" className="form-control" />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <Button type="submit" variant="primary" className="me-2"  disabled={loading}>Submit</Button>
              <Button
                variant="secondary"
                onClick={() => dispatch(setLocation(''))}
               
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default ExperienceForm
