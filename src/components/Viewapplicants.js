import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ip } from "../redux/ip";
import { useDispatch, useSelector } from "react-redux";
import { selectapplicants } from "../redux/applicantsselection";
import { viewfilteredapplicants } from "../redux/viewapplicantSlice";

const ApplicantModal = ({ applicantdata, applicantloading, applicantsuccess, onClose, jobid }) => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.selectapplicants);
  const { filteredloading, filteredsuccess, filtereddata } = useSelector(
    (state) => state.viewapplicant
  );


  const [displayApplicants, setDisplayApplicants] = useState([]);

  const manageselection = async (choice, applicantid) => {
    await dispatch(selectapplicants({ choice, applicantid }));
    if (success) {
      alert("selection email sent");
    }
  };

  const handlefilter = () => {
    dispatch(viewfilteredapplicants({ jobid }));
  };


  useEffect(() => {
    if (applicantsuccess && applicantdata) {
      setDisplayApplicants(applicantdata);
    }
  }, [applicantsuccess, applicantdata]);


  useEffect(() => {
    if (filteredsuccess && filtereddata) {
      setDisplayApplicants(filtereddata);
    }
  }, [filteredsuccess, filtereddata]);

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
          border: "2px solid black",
        }}
      >
        <h3 className="mb-3" style={{ position: "sticky", top: 0 }}>
          Applicants for Job{" "}
          <Button onClick={handlefilter}>Skill Filter</Button>
        </h3>

        {applicantloading || filteredloading ? (
          <p>Loading applicants...</p>
        ) : displayApplicants.length > 0 ? (
          displayApplicants.map((applicant) => (
            <div
              key={applicant._id}
              style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
            >
              <strong>
                {applicant.user.firstname} {applicant.user.lastname}
              </strong>
              <p>
                <strong>Email:</strong> {applicant.user.email}
              </p>
              <p>
                <strong>Title:</strong> {applicant.user.professionaltitle}
              </p>
              <p>Status: {applicant.status}</p>

              {applicant.resume?.generatedPdf ? (
                <a
                  href={`${ip}/media/resume/${applicant.resume.generatedPdf}`}
                  target="_blank"
                  style={{ color: "red" }}
                >
                  View Resume
                </a>
              ) : (
                <p>No resume uploaded</p>
              )}

              {applicant.user?.linkedin && (
                <p>
                  <a
                    href={applicant.user.linkedin}
                    target="_blank"
                    style={{ color: "red" }}
                  >
                    LinkedIn
                  </a>
                </p>
              )}

              {applicant.user?.github && (
                <p>
                  <a
                    href={applicant.user.github}
                    target="_blank"
                    style={{ color: "red" }}
                  >
                    GitHub
                  </a>
                </p>
              )}
              <div className="d-flex justify-content-between">
                <Button
                  onClick={() => manageselection("select", applicant._id)}
                >
                  Select
                </Button>
                <Button
                  onClick={() => manageselection("reject", applicant._id)}
                >
                  Reject
                </Button>
              </div>
            </div>
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

export default ApplicantModal;