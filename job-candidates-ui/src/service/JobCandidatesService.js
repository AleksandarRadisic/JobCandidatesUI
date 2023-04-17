import axios from "axios"


const JobCandidatesService = {

    postJobCandidate: async (data) => {
        return await axios.post(axios.defaults.baseURL + "JobCandidates", data);
    }

}

export default JobCandidatesService