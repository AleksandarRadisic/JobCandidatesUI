import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';

import SkillsService from '../../service/SkillsService';


const SkillList = (props) => {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(props.skills)
  }, [])

  const deleteSkill = (e, skill) => {
    e.preventDefault()
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

  return (
    <div>
      <table className='table table-bordered table-striped' style={{ width: "50%", margin: "auto" }}>
        <tbody>
          {props.skills &&
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
