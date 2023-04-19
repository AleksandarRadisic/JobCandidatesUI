import axios from "axios"


const JobCandidatesService = {

    postJobCandidate: async (data) => {
        return await axios.post(axios.defaults.baseURL + "JobCandidates", data);
    },

    searchJobCandidates: async (data) => {
        console.log(data)
        let url = axios.defaults.baseURL + "JobCandidates"
        if (data.fullName !== "") {
            url += "?fullName=" + data.fullName
        }
        else{
            if(data.skills.length !== 0){
                url += "?skillIds=" + data.skills[0].id
                data.skills.splice(0, 1)
            }
        }
        console.log(url)
        data.skills?.map((skill) => {
            url += "&skillIds=" + skill.id
        })
        console.log(url)
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
    },

    deleteJobCandidate: async (id) => {
        let url = axios.defaults.baseURL + "JobCandidates/"
        return await axios.delete(url + id);
    }

}

export default JobCandidatesService