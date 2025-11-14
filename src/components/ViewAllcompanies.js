import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchcompany } from '../redux/fetchcompanydetails';
import { followunfollow } from '../redux/Followingslice';
import { checkfollowstatus } from '../redux/followedstatus';

import Postcard from './Postcard';

const ViewAllcompanies = () => {
  const dispatch = useDispatch();
  const { othercompanyid } = useParams();

  const { loading, data, success } = useSelector((state) => state.fetchcompany);
  const { followstatusloading, followdata } = useSelector((state) => state.followedstatus);

  const logid = localStorage.getItem("logid");
  const companyid = localStorage.getItem("comid");

  // -------------------------------
  // FETCH COMPANY + FOLLOW STATUS
  // -------------------------------
  useEffect(() => {
    dispatch(fetchcompany(othercompanyid));
  }, [dispatch, othercompanyid]);

  // Run follow-status check only AFTER company is fetched
  useEffect(() => {
    if (success && data?.login) {
      dispatch(
        checkfollowstatus({
          followingid: data.login,
          followerid: logid
        })
      );
    }
  }, [dispatch, success, data?.login, logid]);

  // -------------------------------
  // FOLLOW/UNFOLLOW BUTTON HANDLER
  // -------------------------------
  const handlefollow = async () => {
    if (!data?.login) return;

    await dispatch(
      followunfollow({
        followingid: data.login,
        followerid: logid
      })
    );

    dispatch(
      checkfollowstatus({
        followingid: data.login,
        followerid: logid
      })
    );
  };

  // -------------------------------
  // LOADING VIEW
  // -------------------------------
  if (loading || !success) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  const company = data || {};

  return (
    <Container className="mt-4" style={{ height: "90vh", padding: 10 }}>
      <div className="d-flex gap-4 justify-content-between">

        <Row className="d-flex flex-column">
          <Col>
            <Card bg="light">
              <Card.Body>
                <Card.Title>{company.name}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {company.industry || 'No sector specified'}
                </Card.Subtitle>

                <Card.Text>
                  <strong>Email:</strong> {company.email || 'N/A'} <br />
                  <strong>Phone:</strong> {company.phone || 'N/A'} <br />
                  <strong>District:</strong> {company.district || 'N/A'} <br />
                  <strong>State:</strong> {company.state || 'N/A'} <br />
                  <strong>Location:</strong> {company.location || 'N/A'} <br />
                  <strong>Status:</strong> {company.status || 'N/A'} <br />
                  <strong>Description:</strong> {company.description || 'No description'} <br />
                </Card.Text>

                {company.website && (
                  <Card.Link href={company.website} target="_blank">Website</Card.Link>
                )}
                {company.linkedin && (
                  <Card.Link href={company.linkedin} target="_blank">LinkedIn</Card.Link>
                )}

                {company.logo && (
                  <div className="mt-2">
                    <img
                      src={company.logo}
                      alt="Company Logo"
                      style={{
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                )}
              </Card.Body>

              <Card.Footer className="text-muted">
                Registered: {company.registeredat ? new Date(company.registeredat).toLocaleDateString() : "N/A"} <br />
                Approved: {company.approvedat ? new Date(company.approvedat).toLocaleDateString() : 'Not Approved'} <br />
                Updated: {company.updatedat ? new Date(company.updatedat).toLocaleDateString() : "N/A"}
              </Card.Footer>

              {othercompanyid !== companyid && (
                <Button onClick={handlefollow}>
                  {followstatusloading && <Spinner animation="border" size="sm" />}
                  {followdata?.length === 0 ? 'Follow' : 'Unfollow'}
                </Button>
              )}
            </Card>
          </Col>
        </Row>

        {/* Posts Section */}
        <div style={{ overflowY: 'scroll', width: '400px', maxHeight: '90vh' }}>
          <Postcard otheruserid={company.login} />
        </div>
      </div>
    </Container>
  );
};

export default ViewAllcompanies;
