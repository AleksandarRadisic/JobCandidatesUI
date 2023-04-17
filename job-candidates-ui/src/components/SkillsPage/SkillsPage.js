import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import SkillList from '../SkillList/SkillList';
import SkillsService from '../../service/SkillsService';
import SkillAdd from '../SkillAdd/SkillAdd';


const SkillsPage = () => {

  const [skills, setSkills] = useState();

  const [loading, setLoading] = useState(true);

  const loadSkills = () => {
    setLoading(true);
    SkillsService.getAllSkills().then(res => {
      setSkills(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadSkills();
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h1>Add new skill</h1>
      <div>
        <SkillAdd skills={skills}/>
      </div>
      <h1>Existing skills</h1>
      <div>
        {
          loading &&
          <h2><strong>Loading skills</strong></h2>
        }
        {
          !loading &&
          <SkillList skills={ skills }/>
        }
      </div>
    </div>
  )
};

SkillsPage.propTypes = {};

SkillsPage.defaultProps = {};

export default SkillsPage;
