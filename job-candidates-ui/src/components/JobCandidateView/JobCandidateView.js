import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
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
              <SkillList skills={candidate.skills} candidateSkills={true} candidateId={candidate.id} allSkills={allSkills}/>
          </div>

        </div>
      }

    </>
  )
};

JobCandidateView.propTypes = {};

JobCandidateView.defaultProps = {};

export default JobCandidateView;
