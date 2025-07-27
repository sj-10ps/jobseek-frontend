import React from 'react'
import { Formik,Form,ErrorMessage,Field } from 'formik'
import * as yup from 'yup'
import { useDispatch,useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { passreset } from '../redux/PassresetSlice'

const Passreset = () => {

    
    const validationSchema = yup.object({
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password required")
  })

  const dispatch=useDispatch()
  const navigation=useNavigate()
  const passresetselecter=useSelector((state)=>state.passreset)
  const {token}=useParams()
  
  


  const handleReset=async(values)=>{
      const formdata=new FormData()
      formdata.append("password",values.password)
      formdata.append("token",token)
       const response=await dispatch(passreset(formdata))
       if(response.payload.status==="ok"){
           navigation('/login')
           alert("done")
       }  else{
        alert(response.payload.status)
       }  
  }
  return (
   <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
      <h3 className="text-center">Reset Password</h3>
      <Formik initialValues={{ password: '' }} validationSchema={validationSchema} onSubmit={handleReset}>
        <Form>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <Field name="password" className="form-control" type="text" placeholder="Enter new password" />
            <div className="text-danger"><ErrorMessage name="password" /></div>
          </div>
          
          <button type="submit" className="btn btn-primary w-100" disabled={passresetselecter.loading}>{passresetselecter.loading?<Spinner animation='border' size='sm'></Spinner>:"Reset Password"}</button>
        </Form>
      </Formik>
    </div>
    </div>
  )
}

export default Passreset
