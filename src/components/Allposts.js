import React, { useEffect, useState } from "react";
import { Card, Button, Image, Spinner, Container } from "react-bootstrap";
import { ip } from "../redux/ip";
import { useDispatch, useSelector } from "react-redux";
import { fetchallposts } from "../redux/fetchallposts";
import { updatelikes } from "../redux/PostingSlice";

const Allposts = () => {
  const dispatch = useDispatch();
  const { loading, success, data } = useSelector((state) => state.fetchallposts);
  const [likestatus, setlikestatus] = useState({});
  const [likecount, setlikecount] = useState({});
  const logid = localStorage.getItem("logid");

  // Fetch all posts
  useEffect(() => {
    dispatch(fetchallposts(logid));
  }, [dispatch, logid]);

  // Setup like states
  useEffect(() => {
    const initiallikes = {};
    const initialstatus = {};

    data.forEach((post) => {
      initiallikes[post._id] = post.likes;
      initialstatus[post._id] = post.likedby.includes(logid);
    });

    setlikecount(initiallikes);
    setlikestatus(initialstatus);
  }, [success, data, logid]);

  const handlelike = async (postid) => {
    const currentstatus = likestatus[postid];

    setlikestatus((prev) => ({
      ...prev,
      [postid]: !currentstatus,
    }));

    setlikecount((prev) => ({
      ...prev,
      [postid]: currentstatus ? prev[postid] - 1 : prev[postid] + 1,
    }));

    await dispatch(
      updatelikes({ postid, isliked: !currentstatus, logid })
    );
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="d-flex flex-column align-items-center gap-4">
      {data.length === 0 ? (
        <p className="text-center text-muted">No posts available</p>
      ) : (
        data.map((post) => {
          const isuser = post.logindetails.usertype === "user";
          const profileImage = isuser
            ? `${ip}/media/profile/${post.userdetails.image}`
            : `${ip}/media/profile/${post.companydetails.logo || "default.jpg"}`;
          const displayName = isuser
            ? `${post.userdetails.firstname} ${post.userdetails.lastname}`
            : post.companydetails.name;

          return (
            <Card key={post._id} className="shadow-sm w-100" style={{ maxWidth: "50rem" }}>
              <Card.Header className="d-flex align-items-center gap-3 bg-light">
                <Image
                  src={profileImage}
                  roundedCircle
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div>
                  <h6 className="mb-0">{displayName}</h6>
                  <small className="text-muted">
                    {new Date(post.createdAt).toLocaleDateString("en-GB")}
                  </small>
                </div>
              </Card.Header>

              {post.media && (
                <Card.Img
                  variant="top"
                  src={`${ip}/media/post/${post.media}`}
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              )}

              <Card.Body>
                <Card.Text>{post.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{likecount[post._id]}</strong> Likes
                  </div>
                  <Button
                    variant={likestatus[post._id] ? "danger" : "outline-primary"}
                    size="sm"
                    onClick={() => handlelike(post._id)}
                  >
                    {likestatus[post._id] ? "❤️ Liked" : "🤍 Like"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default Allposts;
