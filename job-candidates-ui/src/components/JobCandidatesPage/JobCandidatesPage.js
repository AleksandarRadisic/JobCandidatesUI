import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import SkillsService from '../../service/SkillsService';
import JobCandidatesService from '../../service/JobCandidatesService';
import JobCandidateView from '../JobCandidateView/JobCandidateView';


const JobCandidatesPage = () => {

  const [loading, setLoading] = useState(true)

  const [allSkills, setAllSkills] = useState([])
  const [selectedSkillId, setSelectedSkillId] = useState()

  const [fullName, setFullName] = useState("")
  const [skills, setSkills] = useState([])

  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    SkillsService.getAllSkills().then(res => {
      setAllSkills(res.data)
      setSelectedSkillId(res.data[0].id)
      setLoading(false)
    })
  }, [])

  const addSkillToTable = (e) => {
    e.preventDefault()
    for (var i = 0; i < skills.length; i++) {
      if (skills[i].id === selectedSkillId) return;
    }
    for (var i = 0; i < allSkills.length; i++) {
      if (allSkills[i].id === selectedSkillId) {
        setSkills(skills.concat(allSkills[i]))
        return;
      }
    }

  }

  const removeSkill = (e, skill) => {
    e.preventDefault()
    setSkills(skills.filter(function (removedSkill) {
      return skill.id !== removedSkill.id
    }))
  }

  const searchJobCandidates = (e) => {
    e.preventDefault()
    setCandidates([])
    let data = {
      fullName: fullName,
      skills: []
    }
    if (skills) {
      (skills).map((skill) => {
        data.skills = data.skills.concat(skill)
      })
    }
    JobCandidatesService.searchJobCandidates(data)
      .then(res => {
        setCandidates(res.data)
      })
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <h2>Search job candidates</h2>
      </div>
      <form style={{ maxWidth: "50%", alignContent: "center", alignItems: "center", margin: "auto" }}>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className="form-control" id="InputFullName" />
        </div>
        <div className="mb-3">
          <label className="form-label">Select skills</label>
          {!loading &&
            <select className="form-select" autoComplete='true' onChange={(e) => setSelectedSkillId(e.target.value)}>
              {(allSkills).map((skill) => {
                return (
                  <option key={skill.id} value={skill.id}>{skill.name}</option>
                )
              })}
            </select>
          }
          <button className="btn btn-primary" onClick={(e) => addSkillToTable(e)} style={{ marginTop: "10px" }}>Add skill</button>
        </div>
        <div>
          {skills.length !== 0 && <label className="form-label">Selected skills</label>}
          <table className='table table-bordered table-striped' style={{ marginTop: "10px" }}>
            <tbody>
              {skills &&
                (skills).map((skill, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "center", verticalAlign: "middle" }}><strong>{skill.name}</strong></td>
                      <td style={{ width: "20%", margin: "auto" }}><button onClick={(e) => removeSkill(e, skill)} className="btn btn-danger"><strong>Remove skill</strong></button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={(e) => searchJobCandidates(e)}>Search</button>
        </div>
      </form>
      <div style={{ marginTop: "10px" }}>
        {candidates.length === 0 &&
          <h2>No candidates found</h2>
        }
        {
          candidates.length !== 0 &&
          (candidates).map((candidate, index) => {
            return <JobCandidateView key={index} candidate={candidate} allSkills={allSkills}/>
          })
        }
      </div>
    </div>
  )
};

JobCandidatesPage.propTypes = {};

JobCandidatesPage.defaultProps = {};

export default JobCandidatesPage;
