import api from './axios'

async function getGlobalStats(top = 5){
    const res = await api.get('/stats', { params: { top } })
    return res.data.data
}


async function getUserStats(uid){
    const res = await api.get(`/stats/${uid}`)
    return res.data.data
}


async function getUserStatsByCommand(uid, command){
    const res = await api.get(`/stats/${uid}/${command}`)
    return res.data.data
}


export default {
    getGlobalStats,
    getUserStats,
    getUserStatsByCommand
}