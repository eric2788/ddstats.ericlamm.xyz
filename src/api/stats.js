import api from './axios'

async function getGlobalStats(top = 10){
    const res = await api.get('/stats', { params: { top } })
    return res.data.data
}


async function getCommandStatus(command, price = false, top = 10) {
    const res = await api.get(`/stats/command/${command}`, { params: { top, price } })
    return res.data.data
}


async function getUserStats(uid, limit = 10){
    const res = await api.get(`/stats/${uid}`, { params: { limit }})
    return res.data.data
}


async function getUserStatsByCommand(uid, command, price = false, limit = 10){
    const res = await api.get(`/stats/${uid}/${command}`, { params: { limit, price }})
    return res.data.data
}


export default {
    getGlobalStats,
    getCommandStatus,
    getUserStats,
    getUserStatsByCommand
}