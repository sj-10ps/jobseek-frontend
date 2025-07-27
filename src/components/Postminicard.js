import React, { useEffect, useState } from 'react'
import { Card,Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { uploadpost } from '../redux/PostingSlice'
import { postfetch } from '../redux/Postslice'

const Postminicard = () => {

  const {loading,success,data}=useSelector((state)=>state.uploadpost)
  const dispatch=useDispatch()
  const [file,setFile]=useState(null)
  const [des,setDes]=useState('')

  const handlesubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('file',file)
    formdata.append('des',des)
    formdata.append('userid',localStorage.getItem('logid'))
    await dispatch(uploadpost(formdata))
    await dispatch(postfetch(localStorage.getItem("logid")))
    
  }
  

 
    
  return (
    <Card style={{ width: '50vw',padding:10,gap:10 }} className="d-flex flex-row flex-wrap">
  
    <Card.Title className='text-primary'>Upload something</Card.Title>
    <form onSubmit={handlesubmit}>
    <Card.Text>
      <input type='file' class="form-control" onChange={(e)=>setFile(e.target.files[0])}></input>
    </Card.Text>
    <Card.Text>
      <textarea type='text' class="form-control" placeholder='type some description' onChange={(e)=>setDes(e.target.value)}></textarea>
    </Card.Text>

    <Button variant="primary" style={{height:'50px',width:'100px'}} type='submit'>{loading?<Spinner animation='border' size='sm'/>:'post'}</Button>
  
     </form>
</Card>

  )
}

export default Postminicard
