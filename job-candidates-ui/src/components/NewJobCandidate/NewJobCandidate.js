import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import SkillsService from '../../service/SkillsService';


const NewJobCandidate = () => {
  const [loading, setLoading] = useState(true)

  const [allSkills, setAllSkills] = useState([])
  const [selectedSkillId, setSelectedSkillId] = useState()

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [skills, setSkills] = useState([])

  const [fullNameValid, setFullNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [phoneNumberValid, setPhoneNumberValid] = useState(false)
  const [birthValid, setBirthValid] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [isPending, setIsPending] = useState(false);

  const validate = () => {
    setFullNameValid(fullName !== "")
    setEmailValid(/\S+@\S+\.\S+/.test(email))
    setPhoneNumberValid(/((\+[0-9]{1,3})|0)[0-9]{7,10}/.test(telephone))
    setBirthValid(dateOfBirth !== null && dateOfBirth !== undefined)

    setButtonDisabled(!(fullNameValid && emailValid && phoneNumberValid && birthValid))
  }

  useEffect(() => {
    SkillsService.getAllSkills().then(res => {
      setAllSkills(res.data)
      setSelectedSkillId(res.data[0].id)
      console.log(selectedSkillId)
      setLoading(false)
    })
  }, [])

  const onSubmit = (e) => {

  }

  const addSkillToTable = (e) => {
    e.preventDefault()
    console.log(selectedSkillId)

  }

  const removeSkill = (e, skill) => {

  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="m-5">
        <form style={{ maxWidth: "50%", alignContent: "center", alignItems: "center", margin: "auto" }}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input value={fullName} onChange={(e) => { setFullName(e.target.value); validate() }} type="text" className="form-control" id="InputFirstName" />
            <label hidden={fullNameValid} className='form-control is-invalid' style={{ color: "red", width: "30%", margin: "auto", marginTop: "15px" }}>Enter full name</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of birth</label>
            <input value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value); validate() }} type="date" className="form-control" id="InputEmail" />
            <label hidden={birthValid} className='form-control is-invalid' style={{ color: "red", width: "30%", margin: "auto", marginTop: "15px" }}>Enter valid date of birth</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value); validate() }} type="email" className="form-control" id="InputEmail" />
            <label hidden={emailValid} className='form-control is-invalid' style={{ color: "red", width: "30%", margin: "auto", marginTop: "15px" }}>Enter valid email address</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone number</label>
            <input value={telephone} onChange={(e) => { setTelephone(e.target.value); validate() }} type="tel" className="form-control" id="InputEmail" />
            <label hidden={phoneNumberValid} className='form-control is-invalid' style={{ color: "red", width: "30%", margin: "auto", marginTop: "15px" }}>Enter valid phone number</label>
          </div>
          <div>
            <label className="form-label">Skills</label>
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
            <table>
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
          </div>
          <div style={{ marginTop: "10px" }}>
            {!isPending && <button onClick={(e) => onSubmit(e)} type="submit" className="btn btn-primary" disabled={buttonDisabled}>Submit</button>}
            {isPending && <label>Registration...</label>}
          </div>
        </form>
      </div>
    </div>
  )
}

NewJobCandidate.propTypes = {};

NewJobCandidate.defaultProps = {};

export default NewJobCandidate;
