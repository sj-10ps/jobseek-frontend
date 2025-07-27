import React from 'react'
import { Formik ,Form,ErrorMessage,Field} from 'formik'
import * as yup from 'yup'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { forgot } from '../redux/forgotSlice'
import {Spinner} from 'react-bootstrap'


const Forgot = () => {
    const dispatch=useDispatch()
    const forgotselector=useSelector((state)=>state.forgot)
    
    const handleforgot=async(values)=>{
        const formdata=new FormData()
        formdata.append("email",values.email)
        const response=await dispatch(forgot(formdata))
        alert(response.payload.status)
    }

    const validationSchema=yup.object({
        email:yup.string().email("invalid email").required("email is required")
    })
  return (
  <Card
      bg={"light"}
      style={{ width: "500px", height: "auto" }}
      className="m-4"
    >
      <Card.Header
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
      >
        Forgot Password
      </Card.Header>
       <Formik initialValues={{email:''}} validationSchema={validationSchema} onSubmit={handleforgot}>
         <Form>
        
            <div className="m-3">
                <label className="form-label">Email</label>
                <Field name="email" className="form-control" placeholder="Enter email" />
               
                <div className="text-danger">
                  <ErrorMessage name="email" />
                </div>
                 <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={forgotselector.loading}
              >
                {forgotselector.loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Submit"
                )}
              </button>

                    
              </div>
         </Form>
       </Formik>
       
    </Card>
  )
}

export default Forgot