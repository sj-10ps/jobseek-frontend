import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Form as BootstrapForm, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { uploadskills } from '../redux/skillsPostSlice'
import { setLocation } from '../redux/LocationSlice'

const SkillsForm = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.skill)

  const initialValues = {
    skill: '',
    proficiency: ''
  }

  const validationSchema = Yup.object({
    skill: Yup.string().required('Skill is required'),
    proficiency: Yup.string().required('Proficiency is required')
  })

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData()
    for (let key in values) {
      formData.append(key, values[key])
    }
    formData.append('userid', localStorage.getItem('userid'))

    dispatch(uploadskills(formData))
    resetForm()
    dispatch(setLocation('/'))
  }

  return (
    <Card style={{ width: '28rem', marginTop: 10 }}>
      <Card.Body>
        <Card.Title>Add Skill</Card.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <BootstrapForm.Group className="mb-2">
                <BootstrapForm.Label>Skill</BootstrapForm.Label>
                <Field name="skill" className="form-control" />
                <ErrorMessage name="skill" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Proficiency</BootstrapForm.Label>
                <Field as="select" name="proficiency" className="form-control">
                  <option value="">Select proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </Field>
                <ErrorMessage name="proficiency" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <Button type="submit" variant="primary" disabled={loading}>
                Submit
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
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

export default SkillsForm
