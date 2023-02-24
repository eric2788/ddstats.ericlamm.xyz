import api from './axios'


async function getGlobalStats(type = "global", top = -1){
    const res = await api.get('/stats', { params: { top, type } })
    return res.data.data
}

async function getCommandStatus(command, price = false, top = -1) {
    const res = await api.get(`/stats/command/${command}`, { params: { top, price } })
    return res.data.data
}


async function getUserStats(uid, limit = -1){
    const res = await api.get(`/stats/${uid}`, { params: { limit }})
    return res.data.data
}

async function getUserStatsByCommand(uid, command, price = false, limit = -1){
    const res = await api.get(`/stats/${uid}/${command}`, { params: { limit, price }})
    return res.data.data
}

async function getFanStatsForVup(uid, type = '', limit = 1000){
    const res = await api.get(`/stats/${uid}/fans`, { params: { type, limit }})
    return res.data.data
}


export default {
    getGlobalStats,
    getCommandStatus,
    getUserStats,
    getUserStatsByCommand,
    getFanStatsForVup
}