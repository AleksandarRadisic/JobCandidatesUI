import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';

import SkillsService from '../../service/SkillsService';
import JobCandidatesService from '../../service/JobCandidatesService';


const SkillList = (props) => {

  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([])

  const [selectedSkillId, setSelectedSkillId] = useState()

  useEffect(() => {
    setSkills(props.skills)
    if(props.allSkills){
      setAllSkills(props.allSkills)
      setSelectedSkillId(props.allSkills[0].id)
    }
  }, [])

  const deleteSkill = (e, skill) => {
    if (props.candidateSkills) {
      e.preventDefault()
      confirmAlert({
        title: "Are you sure?",
        message: "Are you sure you want to delete this skill?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              JobCandidatesService.removeJobCandidateSkill(props.candidateId, skill.id)
                .then((res) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'success',
                    text: res.data
                  })
                }).finally(() => {
                  setSkills(
                    skills.filter(function (removedSkill) {
                      return skill.id !== removedSkill.id;
                    })
                  )
                })
            }
          },
          {
            label: 'No',
            onClick: () => { }
          }
        ]
      })
      return
    }
    confirmAlert({
      title: "Are you sure?",
      message: "Are you sure you want to delete this skill?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            SkillsService.deleteSkill(skill.id)
              .then(res => {
                Swal.fire({
                  icon: 'success',
                  title: 'success',
                  text: res.data
                })
                  .finally(() => {
                    setSkills(
                      skills.filter(function (removedSkill) {
                        return skill.id !== removedSkill.id;
                      })
                    )
                  })
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data,
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

  const addSkillToCandidate = (e) => {
    e.preventDefault()
    var found = false;
      (skills).map((skill) => {
        if (skill.id === selectedSkillId) found = true;
      })
    if (found) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: "Job candidate already has that skill"
      })
      return
    }
    JobCandidatesService.addSkill(props.candidateId, selectedSkillId)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        })
      })
      .finally(() => {
        (allSkills).map((skill) => {
          if (skill.id === selectedSkillId) {
            setSkills(skills.concat(skill))
          }
        })
      })
  }

  return (
    <div>
      {
        props.candidateId &&
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <td>
                <select className="form-select" autoComplete='true' onChange={(e) => setSelectedSkillId(e.target.value)}>
                  {allSkills && (allSkills).map((skill) => {
                    return (
                      <option key={skill.id} value={skill.id}>{skill.name}</option>
                    )
                  })}
                </select>
              </td>
              <td><button className="btn btn-primary" onClick={(e) => addSkillToCandidate(e)}>Add skill</button></td>
            </tr>
          </tbody>
        </table>
      }
      <table className='table table-bordered table-striped' style={{ width: "50%", margin: "auto" }}>
        <tbody>
          {props.skills.length !== 0 &&
            (skills).map((skill, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}><strong>{skill.name}</strong></td>
                  <td style={{ width: "20%", margin: "auto" }}><button onClick={(e) => deleteSkill(e, skill)} className="btn btn-danger"><strong>Remove skill</strong></button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
};

SkillList.propTypes = {};

SkillList.defaultProps = {};

export default SkillList;
