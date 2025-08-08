import { ErrorMessage, Field, Formik, Form } from 'formik';
import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { uploadeducation } from '../redux/uploadcertification'; 
import { setLocation } from '../redux/LocationSlice';
import { fetchdetails } from '../redux/Personaldetailsslice';

const CertificationForm = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.certificate); 

  const initialValues = {
    title: '',
    issued: '',
    issuedate: '',
    credentialid: '',
    credentialurl: '',
    media: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    issued: Yup.string().required('Issued By is required'),
    issuedate: Yup.date().required('Issue Date is required'),
    credentialid: Yup.string().notRequired("optional"),
    credentialurl: Yup.string().url('Enter a valid URL').notRequired("optional"),
    media: Yup.mixed().required('Media file is required'),
  });

  const handleSubmit =async (values) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    formData.append("userid", localStorage.getItem("userid"));
    dispatch(uploadeducation(formData));
    await dispatch(fetchdetails(localStorage.getItem("userid")))
    dispatch(setLocation('/'));
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form encType="multipart/form-data">
          <Card className="w-100 w-md-75 w-lg-50 mb-4" style={{ maxWidth: '30rem' }}>
            <Card.Body>
              <h5 className="text-center mb-4">Certification Details</h5>

              <Row className="mb-3">
                <Col md={12}>
                  <label>Title</label>
                  <Field name="title" className="form-control" type="text" />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <label>Issued By</label>
                  <Field name="issued" className="form-control" type="text" />
                  <ErrorMessage name="issued" component="div" className="text-danger" />
                </Col>
                <Col md={6}>
                  <label>Issue Date</label>
                  <Field name="issuedate" className="form-control" type="date" />
                  <ErrorMessage name="issuedate" component="div" className="text-danger" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <label>Credential ID</label>
                  <Field name="credentialid" className="form-control" type="text" />
                  <ErrorMessage name="credentialid" component="div" className="text-danger" />
                </Col>
                <Col md={6}>
                  <label>Credential URL</label>
                  <Field name="credentialurl" className="form-control" type="url" />
                  <ErrorMessage name="credentialurl" component="div" className="text-danger" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <label>Upload Certificate (Media)</label>
                  <input
                    name="media"
                    className="form-control"
                    type="file"
                    onChange={(event) => setFieldValue("media", event.currentTarget.files[0])}
                  />
                  <ErrorMessage name="media" component="div" className="text-danger" />
                </Col>
              </Row>

              <div className="text-center">
                <Button type="submit" variant="primary" disabled={loading}>Submit</Button>
                 <Button
                                variant="secondary"
                                className="ms-2"
                                onClick={() => dispatch(setLocation(''))}
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

export default CertificationForm;
