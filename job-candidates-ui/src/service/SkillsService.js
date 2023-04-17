import axios from "axios"


const SkillsService = {


    getAllSkills: async () => {
        return await axios.get(axios.defaults.baseURL + "Skills")
    },

    deleteSkill: async (id) => {
        return await axios.delete(axios.defaults.baseURL + "Skills" + "/" + id)
    },

    addSkills: async (skill) => {
        return await axios.post(axios.defaults.baseURL + "Skills", {name:skill})
    }

}

export default SkillsService