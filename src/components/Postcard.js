import React, { useEffect, useState } from 'react';
import { Card, Button, Image, Spinner } from 'react-bootstrap';
import { ip } from '../redux/ip';
import { postfetch } from '../redux/Postslice';
import { useDispatch, useSelector } from 'react-redux';
import { updatelikes } from '../redux/PostingSlice';
import { setid, setLocation } from '../redux/LocationSlice';

const Postcard = ({ otheruserid }) => {
  const dispatch = useDispatch();
  const userid = localStorage.getItem('logid');
  const { data, loading, success } = useSelector((state) => state.postfetch);

  const [likecount, setLikecount] = useState({});
  const [likestatus, setLikestatus] = useState({});

  useEffect(() => {
    dispatch(postfetch(otheruserid || userid));
  }, [userid, otheruserid]);

  useEffect(() => {
    if (success) {
      const initiallikes = {};
      const initialstatus = {};
      data.forEach((item) => {
        initiallikes[item._id] = item.likes || 0;
        initialstatus[item._id] = item.likedby.includes(userid);
      });
      setLikecount(initiallikes);
      setLikestatus(initialstatus);
    }
  }, [data, success, userid]);

  const togglelike = async (postid) => {
    const isliked = likestatus[postid];

    setLikestatus((prev) => ({
      ...prev,
      [postid]: !isliked,
    }));

    setLikecount((prev) => ({
      ...prev,
      [postid]: isliked ? prev[postid] - 1 : prev[postid] + 1,
    }));

    await dispatch(updatelikes({ postid, isliked: !isliked, logid: userid }));
  };

  const handlenavigation = (itemid) => {
    dispatch(setLocation('/comments'));
    dispatch(setid(itemid));
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '200px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div style={{position:'sticky',top:0,zIndex:0}}>
      <h4
        className="text-center bg-white text-dark py-3 px-3 mb-4"
        style={{
          width: '90%',
          borderRadius: 8,
          margin: '0 auto',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        }}
      >
        {otheruserid ? 'User Posts' : 'Your Posts'}
      </h4>

      {success &&
        data.map((item) => (
          <Card
            className="shadow-sm mb-4 mx-auto"
            style={{ width: '90%', borderRadius: '15px' }}
            key={item._id}
          >
            <Card.Img
              variant="top"
              src={`${item.media}`}
              alt="Post"
              style={{
                maxHeight: '350px',
                objectFit: 'cover',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }}
            />

            <Card.Body>
              <Card.Text className="fs-5 mb-3">{item.description}</Card.Text>

              <div className="d-flex justify-content-between align-items-center">
                <div
                  onClick={() => togglelike(item._id)}
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: 'pointer', fontWeight: '500' }}
                >
                  {likestatus[item._id] ? '❤️' : '🤍'} {likecount[item._id]} Likes
                </div>

                <div
                  onClick={() => handlenavigation(item._id)}
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: 'pointer', fontWeight: '500' }}
                >
                  💬 Comment
                </div>
              </div>
            </Card.Body>

            <Card.Footer className="text-muted text-end">
              Posted on: {new Date(item.createdAt).toLocaleDateString()}
            </Card.Footer>
          </Card>
        ))}
    </div>
  );
};

export default Postcard;
