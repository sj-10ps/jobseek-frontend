import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ForYou from "./ForYou";
import Allposts from "./Allposts";

const Community = () => {
  const [activeTab, setActiveTab] = useState("forYou");

  return (
    <Container fluid className="p-4">
      <Row className="mb-3" style={{position:'sticky',top:80,zindex:1}}>
        <Col className="d-flex gap-3">
          <Button
            variant={activeTab === "forYou" ? "primary" : "outline-primary"}
            onClick={() => setActiveTab("forYou")}
          >
            For You
          </Button>
          <Button
            variant={activeTab === "allPosts" ? "primary" : "outline-primary"}
            onClick={() => setActiveTab("allPosts")}
          >
            All Posts
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          {activeTab === "forYou" && (
            <ForYou/>
          )}

          {activeTab === "allPosts" && (
            <Allposts/>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Community;
