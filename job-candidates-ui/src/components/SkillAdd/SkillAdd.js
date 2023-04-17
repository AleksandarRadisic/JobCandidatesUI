import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SkillsService from '../../service/SkillsService';
import Swal from 'sweetalert2';


const SkillAdd = (props) => {

  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([])
  const [errorLabel, setErrorLabel] = useState(true)
  const [buttonEnabled, setButtonEnabled] = useState(false)

  const skillNameInputChange = (name) => {
    setSkillName(name)
    var errorFound = false
    skills.map((skill) => {
      if (skill.name === name)
        errorFound = true
    })
    setErrorLabel(!errorFound)
    setButtonEnabled(!errorFound && name)
  }

  const saveNewSkill = (e) => {
    e.preventDefault()
    SkillsService.addSkills(skillName)
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: res.data
        })
        .finally(() =>{
          window.location.reload()
        })
      })
      .catch((err) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data,
        })
      })
  }

  useEffect(() => {
    setSkills(props.skills)
  })

  return (
    <div className='mb-5' style={{ width: "50%", margin: "auto" }}>
      <input value={skillName} onChange={(e) => skillNameInputChange(e.target.value)} type="text" className='form-control' placeholder='Enter new skill here' id='skillNameInput' />
      <label hidden={errorLabel} className='form-control is-invalid' style={{ color: "red", width: "30%", margin: "auto", marginTop: "15px" }}>Skill already exists</label>
      <button className="btn btn-primary" style={{ marginTop: "10px" }} disabled={!buttonEnabled} onClick={(e) => saveNewSkill(e)}><strong>Add skill</strong></button>
    </div>
  )

}

SkillAdd.propTypes = {};

SkillAdd.defaultProps = {};

export default SkillAdd;
