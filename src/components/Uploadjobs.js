import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { uploadjob } from '../redux/uploadjobslice';

const Uploadjobs = () => {
  const initialValues = {
    title: '',
    jobtype: '',
    description: '',
    skills: [''],
    responsibilities: '',
    salaryrange: '',
    experience: '',
    status: 'open',
   
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Job title is required'),
    jobtype: Yup.string().required('Job type is required'),
    description: Yup.string().required('Description is required'),
    skills: Yup.array().of(Yup.string().required('Skill cannot be empty')),
    responsibilities: Yup.string().required('Responsibilities are required'),
    salaryrange: Yup.string().required('Salary range is required'),
    experience: Yup.string().required('Experience is required'),
    status: Yup.string().required('Status is required')
  });

  const dispatch=useDispatch()

  const handleSubmit = (values, { resetForm }) => {
    const formdata=new FormData()
    for(let i in values){
       if(i==="skills"){
        formdata.append(i,JSON.stringify(values[i]))
       }else{
            formdata.append(i,values[i])
       }
       
    }
    formdata.append("comid",localStorage.getItem("userid"))

    dispatch(uploadjob(formdata))
    alert('Job Uploaded Successfully!');
    resetForm();
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-4 text-center">Upload Job</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {/* Job Title */}
              <div className="mb-3">
                <label>Job Title</label>
                <Field name="title" className="form-control" placeholder="Enter job title" />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>

              {/* Job Type */}
              <div className="mb-3">
                <label>Job Type</label>
                <Field as="select" name="jobtype" className="form-control">
                  <option value="">Select job type</option>
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </Field>
                <ErrorMessage name="jobtype" component="div" className="text-danger" />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label>Description</label>
                <Field as="textarea" name="description" className="form-control" rows="3" placeholder="Enter job description" />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>

              {/* Skills */}
              <div className="mb-3">
                <label>Skills</label>
                <FieldArray name="skills">
                  {({ remove, push }) => (
                    <>
                      {values.skills.map((_, index) => (
                        <div key={index} className="d-flex mb-2">
                          <Field name={`skills.${index}`} className="form-control me-2" placeholder="Enter skill" />
                          <Button variant="danger" type="button" onClick={() => remove(index)}>-</Button>
                          {index === values.skills.length - 1 && (
                            <Button variant="success" type="button" onClick={() => push('')} className="ms-2">+</Button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
                <ErrorMessage name="skills" component="div" className="text-danger" />
              </div>

              {/* Responsibilities */}
              <div className="mb-3">
                <label>Responsibilities</label>
                <Field as="textarea" name="responsibilities" className="form-control" rows="3" placeholder="Enter job responsibilities" />
                <ErrorMessage name="responsibilities" component="div" className="text-danger" />
              </div>

              {/* Salary Range */}
              <div className="mb-3">
                <label>Salary Range</label>
                <Field name="salaryrange" className="form-control" placeholder="e.g. 30,000 - 50,000" />
                <ErrorMessage name="salaryrange" component="div" className="text-danger" />
              </div>

              {/* Experience */}
              <div className="mb-3">
                <label>Experience</label>
                <Field name="experience" className="form-control" placeholder="e.g. 2 years" />
                <ErrorMessage name="experience" component="div" className="text-danger" />
              </div>

              {/* Status */}
              <div className="mb-3">
                <label>Status</label>
                <Field as="select" name="status" className="form-control">
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-danger" />
              </div>

            
             

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="w-100">Upload Job</Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default Uploadjobs;
