import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggledark } from "../redux/themeSlice";
import { Button, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "../css/navbar.css";
import Postcard from "./Postcard";
import {
  fetchallusercompanies,
  fetchusercompanies,
} from "../redux/fetchuserandcompanies";
import { Search } from "lucide-react";
import ViewAllcompanies from "./ViewAllcompanies";
import "../css/theme.css";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [searchdisplay, setsearchdisplay] = useState(false);

  const [filteredResults, setFilteredResults] = useState([]);

  const { loading, success, data } = useSelector(
    (state) => state.fetchusercompanies
  );

  const navigate = useNavigate();
  const setsearch = (value) => {
    setQuery(value);
    setsearchdisplay(!searchdisplay);
    const formdata = new FormData();
    formdata.append("query", value);

    dispatch(fetchusercompanies(formdata));
  };

  const location = useLocation();
  const pathname = location.pathname;

  const themeSelector = useSelector((state) => state.theme);

  const isHome =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/companyreg" ||
    pathname === "/userregistration";

  const isUser =
    [
      "/userhome",
      "/userintro",
      "/comments",
      "/profile",
      "/userProfile",
      "/resumetemplates",
      "/alljobs",
      "/usercommunity",
      "/messaging",
      "/userfeedback"
    ].includes(pathname) ||
    pathname.startsWith("/Showresumepreview/") ||
    pathname.startsWith("/userProfile") ||
    pathname.startsWith("/viewallusers") ||
    (pathname.startsWith("/companyprofile") && <ViewAllcompanies />);

  const iscompany = [
    "/companyhome",
    "/uploadjobs",
    "/viewapplications",
    "/community",
    "/companymessages",
    "/companyfeedback"
  ].includes(pathname);

  const isadmin = [
    "/adminhome",
    "/adminviewallusers",
    "/adminviewallcompanies",
    "/viewcompanyrequests",
    "/viewfeedbacks"
  ].includes(pathname);

  const handleThemeToggle = async () => {
    await dispatch(toggledark());
  };

  const dropdownItems = [
    { label: "Home", path: "/userhome" },
    { label: "Profile", path: "/userProfile" },
    { label: "All Jobs", path: "/alljobs" },
    { label: "Messaging", path: "/messaging" },
    { label: "Community", path: "/usercommunity" },
  ];

  const dropdownItemscompany = [
    { label: "home", path: "/companyhome" },
    { label: "upload jobs", path: "/uploadjobs" },
    { label: "view applications", path: "/viewapplications" },
    { label: "community", path: "/community" },
    { label: "messages", path: "/companymessages" },
    {label:"message applicants",path:"/selecteduserstext"}
  ];

  return (
    <Navbar
      expand="lg"
      className={
        themeSelector.dark ? "bg-dark navbar-dark" : "bg-light navbar-light"
      }
    >
      <Container fluid className="px-4">
        <div className="d-flex align-items-center">
          {isUser && (
            <div onClick={() => setToggle((prev) => !prev)}>
              {console.log(toggle)}
              <Dropdown show={toggle}>
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
                    display: toggle ? "flex" : "none",
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
                        transition: "background 0.2s ease-in-out",
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
            </div>
          )}
          {iscompany && (
            <Dropdown show={toggle}>
              <Dropdown.Toggle
                onClick={() => setToggle((prev) => !prev)}
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
                  display: toggle ? "flex" : "none",
                  flexDirection: "column",
                  gap: "15px",
                  borderRadius: "12px",
                  marginTop: "10px",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {dropdownItemscompany.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setToggle(false);
                      navigate(item.path);
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
                      transition: "background 0.2s ease-in-out",
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
                <div
                  className="input-group mb-3"
                  style={{ maxWidth: "400px", marginRight: 100 }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => navigate(`/viewallusers/${query}`)}
                  >
                    Search Users
                  </button>
                </div>
                {searchdisplay && (
                  <div
                    className="list-group position-absolute"
                    style={{
                      zIndex: 10,
                      right: "230px",
                      top: "58px",
                      width: "400px",
                    }}
                  >
                    {data && (
                      <ul>
                        {data.map((user, idx) => (
                          <li
                            key={idx}
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                              navigate(
                                user.type === "user"
                                  ? `/userProfile/${user._id}`
                                  : `/companyprofile/${user._id}`
                              );

                              setFilteredResults([]);
                              setsearchdisplay(!searchdisplay);
                              setQuery("");
                            }}
                          >
                            {user.name}
                          </li>
                        ))}
                        <Button
                          className="d-flex justify-content-center w-100"
                          onClick={() => setsearchdisplay(!searchdisplay)}
                        >
                          Cancel
                        </Button>
                      </ul>
                    )}
                  </div>
                )}

                 <Nav.Link as={Link} to="/userfeedback">
                  Feedback
                </Nav.Link>

                <Nav.Link as={Link} to="/login">
                  Logout
                </Nav.Link>
              </>
            )}

            {iscompany && (
              <>
                <div
                  className="input-group mb-3"
                  style={{ maxWidth: "400px", marginRight: 100 }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => navigate(`/viewallusers/${query}`)}
                  >
                    Search Users
                  </button>
                </div>
                {searchdisplay && (
                  <div
                    className="list-group position-absolute"
                    style={{
                      zIndex: 10,
                      right: "320px",
                      top: "58px",
                      width: "400px",
                    }}
                  >
                    {data.length >= 0 && (
                      <ul>
                        {data.map((user, idx) => (
                          <li
                            key={idx}
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                              navigate(
                                user.type === "user"
                                  ? `/userProfile/${user._id}`
                                  : `/companyprofile/${user._id}`
                              );

                              setFilteredResults([]);
                              setsearchdisplay(!searchdisplay);
                              setQuery("");
                            }}
                          >
                            {user.name}
                          </li>
                        ))}
                        <Button
                          className="d-flex justify-content-center w-100"
                          onClick={() => setsearchdisplay(!searchdisplay)}
                        >
                          Cancel
                        </Button>
                      </ul>
                    )}
                  </div>
                )}

                 <Nav.Link as={Link} to="/companyfeedback">
                  Feedback
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Logout
                </Nav.Link>
              </>
            )}

            {isadmin && (
              <>
                <Nav.Link as={Link} to="/adminhome">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/adminviewallcompanies">
                  All companies
                </Nav.Link>
                <Nav.Link as={Link} to="/adminviewallusers">
                  All users
                </Nav.Link>
                <Nav.Link as={Link} to="/viewcompanyrequests">
                  Company requests
                </Nav.Link>
              </>
            )}

            <Nav.Link
              onClick={handleThemeToggle}
              className={themeSelector.dark ? "moon" : "sun"}
            ></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
