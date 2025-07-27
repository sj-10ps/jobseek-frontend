import React, { useReducer, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { login } from '../redux/loginSclice'
import { useDispatch,useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const Loginform = () => {
  const [password,setPassword]=useState(false)
  const [status,setStatus]=useState("")
  const dispatch=useDispatch()
  const location=useLocation()
  const pathname=location.pathname
  const navigation=useNavigate()
  const logindata=useSelector((state)=>state.login)
  const validationSchema = yup.object({
    email: yup.string().email('invalid email').required('This field is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  })

  const handleSubmit = async(values,{resetForm}) => {
    const formdata=new FormData()
    Object.keys(values).forEach((key)=>{
      formdata.append(key,values[key])
    })
    const response=await dispatch(login(formdata))
    if(response.payload.status=="ok"){
       localStorage.setItem("userid",response.payload.userId)
       localStorage.setItem("logid",response.payload.log_id)
      
      
       if(response.payload.usertype==="user"){
        navigation('/userhome')
       }else if(response.payload.usertype==="company"){
        navigation('/companyhome')
       }else if(response.payload.usertype==="admin"){
        navigation('/adminhome')
       }else{
        setStatus("wait until the admin approve the regitration request")
       }
    }else{
        setStatus(response.payload.status)
       }

  }



  return (
   
      <div className="card p-4 shadow" style={{ width: '400px' }}>
   
      
        <h3 className="text-center mb-4">Login</h3>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        
            <Form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field name="email" className="form-control" placeholder="Enter email" />
                <div className="text-danger">
                  <ErrorMessage name="username" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div style={{display:'flex'}}>             
                 <Field name='password' placeholder={`enter the password`} className='form-control' type={password==false?'password':'text'} id="password"></Field>
               <button onClick={(e)=>{e.preventDefault();setPassword(!password)}}>{password==false?'show':'hide'}</button>
                    </div>  
                <div className="text-danger">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">
               {logindata.loading?<Spinner animation='border' size='sm' />:'Login'}
              </button>
              <button className='btn btn-secondary w-100 mt-3' onClick={(e)=>{e.preventDefault(); navigation('/forgot')}}>forgot password</button>
              <div style={{color:'red',fontSize:'20px'}}>
                 {status}
              </div>

            </Form>
      
        </Formik>
       
    
  
 
       
      </div>
 
  )
}

export default Loginform
