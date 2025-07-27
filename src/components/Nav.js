import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import bg from "../assets/images/bg.png";
import { useDispatch, useSelector } from "react-redux";
import { toggledark } from "../redux/themeSlice";
import { useSelect } from "@chakra-ui/react";
import { Dropdown } from "react-bootstrap";

const NavBar = () => {
  const Location = useLocation();
  const pathname = Location.pathname;
  const ishome =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/companyreg" ||
    pathname === "/userregistration";
  const isuser = pathname === "/userhome" || pathname === "/userintro"||pathname === "/comments"||pathname=='/profile'||pathname==="/userProfile";
  const dispatch = useDispatch();
  const themeselector = useSelector((state) => state.theme);
  const handletheme = async () => {
    await dispatch(toggledark());
  };

  return (
    <Navbar
      expand="lg"
      className={
        themeselector.dark ? "bg-dark navbar-dark" : "bg-light navbar-light"
      }
    >
      <Container>
        {isuser && (
          <>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{ marginRight: 5, width: "50px" }}
              >
                &#9776;
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/userhome">Home</Dropdown.Item>
                <Dropdown.Item href="/userprofile">Profile</Dropdown.Item>
                <Dropdown.Item href="/alljobs">All Jobs</Dropdown.Item>
                <Dropdown.Item href="/alljobs">messaging</Dropdown.Item>
                <Dropdown.Item href="/complaintstatus">
                  Complaint Status
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>{" "}
          </>
        )}
        <Navbar.Brand>JobSeek</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {ishome && (
              <>
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/userregistration"}>
                  User Registration
                </Nav.Link>
                <Nav.Link as={Link} to={"/companyreg"}>
                  Company Registration
                </Nav.Link>
              </>
            )}

            {isuser && (
              <>
                <Nav.Link as={Link} to={"/login"}>
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to={"/userintro"}>
                  About
                </Nav.Link>
              </>
            )}
            <Nav.Link onClick={handletheme}>theme toggle</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
