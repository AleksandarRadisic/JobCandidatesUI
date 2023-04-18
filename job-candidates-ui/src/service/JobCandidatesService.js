import axios from "axios"


const JobCandidatesService = {

    postJobCandidate: async (data) => {
        return await axios.post(axios.defaults.baseURL + "JobCandidates", data);
    },

    searchJobCandidates: async (data) => {
        let url = axios.defaults.baseURL + "JobCandidates"
        if (data.fullName !== "") {
            url += "?fullName=" + data.fullName
        }
        data.skills?.map((skill) => {
            url += "&skillIds=" + skill.id
        })
        return await axios.get(url)
    },

    removeJobCandidateSkill: async (candidateId, skillId) => {
        let url = axios.defaults.baseURL + "JobCandidates/"
        url += candidateId
        url += "/skill/"
        url += skillId
        return await axios.delete(url);
    },

    addSkill: async (candidateId, skillId) =>{
        let url = axios.defaults.baseURL + "JobCandidates/"
        url += candidateId
        url += "/skill"
        return await axios.post(url, {id: skillId});
    }

}

export default JobCandidatesService