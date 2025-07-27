import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggledark } from "../redux/themeSlice";
import { Button, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "../css/navbar.css";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeSelector = useSelector((state) => state.theme);
  console.log(toggle)

  const isHome =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/companyreg" ||
    pathname === "/userregistration";

  const isUser = [
    "/userhome",
    "/userintro",
    "/comments",
    "/profile",
    "/userProfile"
  ].includes(pathname);

  const handleThemeToggle = async () => {
    await dispatch(toggledark());
  };

  const dropdownItems = [
    { label: "Home", path: "/userhome" },
    { label: "Profile", path: "/userprofile" },
    { label: "All Jobs", path: "/alljobs" },
    { label: "Messaging", path: "/messaging" },
    { label: "Complaint Status", path: "/complaintstatus" }
  ];

  return (
    <Navbar
      expand="lg"
      className={themeSelector.dark ? "bg-dark navbar-dark" : "bg-light navbar-light"}
    >
      <Container fluid className="px-4">
        <div className="d-flex align-items-center">
          {isUser && (
            <Dropdown onToggle={() => setToggle((prev)=>!prev)}>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                  width: "50px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: themeSelector.dark ? "white" : "black",
                  fontSize: "24px",
                  boxShadow: "none",
                 
                }}
              >
                <FaBars />
              </Dropdown.Toggle>

              <Dropdown.Menu
                align="start"
                style={{
                  width: "250px",
                  padding: "20px",
                  backgroundColor: "#2c2c2c",
                  display: toggle?"flex":'none',
                  flexDirection: "column",
                  gap: "15px",
                  borderRadius: "12px",
                  marginTop: "10px",
                  transition: "all 0.3s ease-in-out",
                   
                }}
              >
                {dropdownItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setToggle(false);
                    }}
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#1a1a1a",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      textAlign: "left",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "background 0.2s ease-in-out"
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#333")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1a1a1a")
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}

          <Navbar.Brand className="ms-3">JobSeek</Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isHome && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/userregistration">
                  User Registration
                </Nav.Link>
                <Nav.Link as={Link} to="/companyreg">
                  Company Registration
                </Nav.Link>
              </>
            )}

            {isUser && (
              <>
                <Nav.Link as={Link} to="/login">
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/userintro">
                  About
                </Nav.Link>
              </>
            )}

            <Nav.Link onClick={handleThemeToggle}>Theme Toggle</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
