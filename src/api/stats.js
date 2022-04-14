import api from './axios'

async function getGlobalStats(top = 10){
    const res = await api.get('/stats', { params: { top } })
    return res.data.data
}


async function getUserStats(uid, limit = 10){
    const res = await api.get(`/stats/${uid}`, { params: { limit }})
    return res.data.data
}


async function getUserStatsByCommand(uid, command, limit = 10){
    const res = await api.get(`/stats/${uid}/${command}`, { params: { limit }})
    return res.data.data
}


export default {
    getGlobalStats,
    getUserStats,
    getUserStatsByCommand
}