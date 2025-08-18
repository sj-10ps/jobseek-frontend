import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ip } from "../redux/ip"; // ✅ Ensure correct IP path
import { useDispatch, useSelector } from "react-redux";
import { inviteforinterview, selectapplicants } from "../redux/applicantsselection";

const Selectedapplicants = ({ applicantdata, applicantloading, onClose }) => {
    const dispatch=useDispatch()
    const {loading,success}=useSelector(state=>state.selectapplicants)
    const [date,setDate]=useState('')
   const manageselection=async(applicantid)=>{
      await dispatch(inviteforinterview({date,applicantid}))
      if(success){
        alert("invitation email sent")
      }

   }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "grey",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "400px",
          maxHeight: "80vh",
          overflowY: "auto",
          border:"2px solid black"
        }}
      >
        <h3 className="mb-3">Applicants for Job</h3>

    {applicantloading ? (
  <p>Loading applicants...</p>
) : applicantdata.length > 0 ? (
  applicantdata.map((applicant, index) => (
    <>
    <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
      <strong>{applicant.user.firstname} {applicant.user.lastname}</strong>
      <p><strong>Email:</strong> {applicant.user.email}</p>
      <p><strong>Title:</strong> {applicant.user.professionaltitle}</p>
      <p>Status: {applicant.status}</p>

      {applicant.resume?.generatedPdf ? (
        <a href={`${ip}/media/resume/${applicant.resume.generatedPdf}`} target="_blank" style={{color:'red'}}>
          View Resume
        </a>
      ) : (
        <p>No resume uploaded</p>
      )}

      {applicant.user?.linkedin && (
        <p>
          <a href={applicant.user.linkedin} target="_blank" style={{color:'red'}}>LinkedIn</a>
        </p>
      )}

      {applicant.user?.github && (
        <p>
          <a href={applicant.user.github} target="_blank" style={{color:'red'}}>GitHub</a>
        </p>
      )}
    
        <Form onSubmit={()=>manageselection(applicant._id)} style={{display:'flex',flexDirection:'column',gap:3}}>
        <input type="date" onChange={(e)=>setDate(e.target.value)}></input>
      <Button type="submit">Invite for interview</Button>
      </Form>
       
    
    </div>




    </>
  ))
) : (
  <p>No applicants yet.</p>
)}


        <div className="text-end mt-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Selectedapplicants;