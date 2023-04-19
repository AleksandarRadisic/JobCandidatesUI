import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';
import { format } from "date-fns";
import SkillList from '../SkillList/SkillList';
import JobCandidatesService from '../../service/JobCandidatesService';


const JobCandidateView = (props) => {

  const [candidate, setCandidate] = useState()
  const [allSkills, setAllSkills] = useState([])

  const [selectedSkillId, setSelectedSkillId] = useState()

  useEffect(() => {
    setCandidate(props.candidate)
    setAllSkills(props.allSkills)
    setSelectedSkillId(props.allSkills[0].id)
  }, [])

  const deleteJobCandidate = (e) => {
    e.preventDefault()
    confirmAlert({
      title: "Are you sure?",
      message: "Are you sure you want to delete this job candidate?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            JobCandidatesService.deleteJobCandidate(candidate.id)
              .then((res) => {
                Swal.fire({
                  icon: 'success',
                  title: 'success',
                  text: res.data
                }).finally(() => {
                  window.location.reload()
                })
              })
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    })
  }

  return (
    <>
      {candidate &&
        <div className="container mb-3">
          <div style={{ border: "solid", width: "80%", margin: "auto" }}>
            <h3>Name: {candidate.fullName}</h3>
            <h3>Date of birth: {format(new Date(candidate.dateOfBirth), "dd-MM-yyyy")}</h3>
            <h3>Email: {candidate.email}</h3>
            <h3>Phone number: {candidate.phoneNumber}</h3>
            <h3>Add new skill</h3>
            <SkillList skills={candidate.skills} candidateSkills={true} candidateId={candidate.id} allSkills={allSkills} />
            <div style={{marginTop: "10px", marginBottom: "10px"}}>
              <button onClick={(e) => deleteJobCandidate(e, candidate.id)} className="btn btn-danger"><strong>Remove candidate</strong></button>
            </div>
          </div>
        </div>
      }

    </>
  )
};

JobCandidateView.propTypes = {};

JobCandidateView.defaultProps = {};

export default JobCandidateView;
