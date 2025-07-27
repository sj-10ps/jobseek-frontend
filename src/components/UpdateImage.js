import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/userSlice';
import { setLocation } from '../redux/LocationSlice';

const SimpleImageUpload = ({ onSubmit }) => {
  const [image, setImage] = useState(null);
  const dispatch=useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('userid',localStorage.getItem("userid"))
      dispatch(updateProfile(formData))
      dispatch(setLocation('/userHome'))

    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select an image</Form.Label>
        <Form.Control type="file"  onChange={(e)=>setImage(e.currentTarget.files[0])} />
      </Form.Group>
      <Button type="submit" variant="primary" disabled={!image}>
        Upload
      </Button>
    </Form>
  );
};

export default SimpleImageUpload;
