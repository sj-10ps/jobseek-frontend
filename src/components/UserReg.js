import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Card, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const UserReg = () => {
  const [password, setPassword] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(3, "minimum 3 words are required")
      .required("firstname required"),
    lastname: Yup.string().optional(),
    email: Yup.string().email("invalid format").required("email is required"),
    password: Yup.string()
      .min(3, "minimum 6 letters required")
      .required("password is required"),
  });
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formdata = new FormData();
    Object.keys(values).forEach((key) => {
      formdata.append(key, values[key]);
    });
    const response = await dispatch(registerUser(formdata));
    if (response.payload.status === "ok") {
      navigation("/login");
    } else {
     
      resetForm();
    }
  };

  return (
    <Card
      bg={"light"}
      style={{ width: "500px", height: "auto" }}
      className="m-4"
    >
      <Card.Header
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
      >
        User Registration
      </Card.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Card.Body>
          <Form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Field
                name="firstname"
                placeholder={`enter the firstname`}
                className="form-control"
              ></Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="firstname" />
              </div>

              <Field
                name="lastname"
                placeholder={`enter the lastname`}
                className="form-control"
              ></Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="lastname" />
              </div>

              <Field
                name="email"
                placeholder={`enter the email`}
                className="form-control"
              ></Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" style={{ color: "red" }} />
              </div>

              <div style={{ display: "flex" }}>
                <Field
                  name="password"
                  placeholder={`enter the password`}
                  className="form-control"
                  type={password == false ? "password" : "text"}
                  id="password"
                ></Field>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPassword(!password);
                  }}
                >
                  {password == false ? "show" : "hide"}
                </button>
              </div>
              <div style={{ color: "red" }}>
                <ErrorMessage name="password" />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={user.loading}
              >
                {user.loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Submit"
                )}
              </button>
               <div style={{ color: "red" ,alignSelf:'center'}}>
                {user.status}
              </div>
            </div>
          </Form>
        </Card.Body>
      </Formik>
    </Card>
  );
};

export default UserReg;
