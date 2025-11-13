import React, { useEffect, useState } from 'react';
import { Card, Button, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { followingfollowercount } from '../redux/Followingandfollowercount';
import { ip } from '../redux/ip';
import { useNavigate } from 'react-router-dom';
import { setLocation } from '../redux/LocationSlice';
import { motion } from 'framer-motion';

const FollowersFollowing = () => {
  const [activeTab, setActiveTab] = useState('followers');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logid = localStorage.getItem("logid");

  const {
    followerloading,
    followerdata,
    followingdata,
  } = useSelector((state) => state.followingfollowercount);

  useEffect(() => {
    dispatch(followingfollowercount(logid));
  }, [dispatch, logid]);

  const handleProfileClick = (item) => {
    if (item.type === 'user') {
      navigate(`/userProfile/${item.data.id}`);
    } else {
      navigate(`/companyprofile/${item.data.id}`);
    }
  };

  const renderList = (list) => {
    if (list.length === 0) {
      return (
        <p className="text-center text-muted">
          No {activeTab} found
        </p>
      );
    }

    return list.map((item, index) => (
     
      <div
        key={index}
        className="d-flex align-items-center py-2 border-bottom"
         
        style={{ cursor: 'pointer'}}
        onClick={() => handleProfileClick(item)}
      >
        <Image
          src={
            item.type === 'user'
              ? `${item.data.image}`
              : `${item.data.logo}`
          }
          roundedCircle
          style={{ width: 50, height: 50, marginRight: 15 }}
        />
        <strong>
          {item.type === 'user'
            ? item.data.firstname
            : item.data.name}
        </strong>
      </div>
    
    ));
  };
  

  return (
    <Card
      style={{
        maxWidth: '30rem',
        margin: 'auto',
        padding: '1rem',
        maxHeight: '90vh',
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {/* Header Buttons */}
      <div
        className="d-flex justify-content-between align-items-center mb-3 sticky-top bg-white"
        style={{ top: 0, zIndex: 1 }}
      >
        <div
          onClick={() => dispatch(setLocation('/'))}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        >
          🔙
        </div>
        <div className="d-flex gap-2">
          <Button
            variant={activeTab === 'followers' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('followers')}
          >
            Followers
          </Button>
          <Button
            variant={activeTab === 'following' ? 'primary' : 'outline-primary'}
            onClick={() => setActiveTab('following')}
          >
            Following
          </Button>
        </div>
      </div>

      {/* Loading */}
      {followerloading && (
        <div className="text-center py-4">
          <Spinner animation="border" size="sm" />
        </div>
      )}

      {/* List */}
      {!followerloading &&
        (activeTab === 'followers'
          ? renderList(followerdata)
          : renderList(followingdata))}
    </Card>
  );
};

export default FollowersFollowing;
