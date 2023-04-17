import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

import SkillsPage from './components/SkillsPage/SkillsPage';
import JobCandidatesPage from './components/JobCandidatesPage/JobCandidatesPage'
import NewJobCandidate from './components/NewJobCandidate/NewJobCandidate';

axios.defaults.baseURL = "https://localhost:44316/api/"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route key={uuidv4()} exact path="/" element={[<JobCandidatesPage key={uuidv4()} />]} />
          <Route key={uuidv4()} exact path="/job-candidate" element={[<NewJobCandidate key={uuidv4()} />]} />
          <Route key={uuidv4()} exact path="/skills" element={[<SkillsPage key={uuidv4()} />]} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
