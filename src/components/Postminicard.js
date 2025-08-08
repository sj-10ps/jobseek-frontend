import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { uploadpost } from '../redux/PostingSlice';
import { postfetch } from '../redux/Postslice';

const Postminicard = () => {
  const { loading } = useSelector((state) => state.uploadpost);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [des, setDes] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('des', des);
    formdata.append('userid', localStorage.getItem('logid'));

    await dispatch(uploadpost(formdata));
    await dispatch(postfetch(localStorage.getItem('logid')));
  };

  return (
    <Card className="shadow-sm p-4" style={{ maxWidth: '100%', borderRadius: '15px' }}>
      <Card.Title className="text-primary mb-3">📤 Upload Something</Card.Title>

      <Form onSubmit={handlesubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select File</Form.Label>
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Type some description..."
            onChange={(e) => setDes(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Post'}
        </Button>
      </Form>
    </Card>
  );
};

export default Postminicard;
