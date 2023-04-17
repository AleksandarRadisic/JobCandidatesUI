import React from 'react';
import PropTypes from 'prop-types';



const Navbar = () => {


  return (
    <div className="m-4 p-1">
      <ul className="nav nav-fill ">
        <li className="nav-item" key={523}>
          <a style={{ textDecoration: "none" }} href="/"><h1>Job Candidates</h1></a>
        </li>
        <li className="nav-item" key={24}>
          <a style={{ textDecoration: "none" }} href="/job-candidate"><h1>New Job Candidate</h1></a>
        </li>
        <li className="nav-item" key={1}>
          <a style={{ textDecoration: "none" }} href="/skills"><h1>Skills</h1></a>
        </li>
      </ul>
      <hr></hr>
    </div>
  )
};

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
