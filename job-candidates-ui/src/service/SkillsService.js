import axios from "axios"


const SkillsService = {


    getAllSkills: async () => {
        return await axios.get(axios.defaults.baseURL + "Skills")
    },

    deleteSkill: async (id) => {
        return await axios.delete(axios.defaults.baseURL + "Skills" + "/" + id)
    }

}

export default SkillsService