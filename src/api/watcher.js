import api from './axios'


async function getWatcherStats(type, top = 10){
    const res = await api.get('/watcher/stats', {params: {type, top}})
    return res.data.data
}

async function getWatcherRecords(uid, page, command = '', pageSize = 30){
    const res = await api.get(`/watcher/record/${uid}`, {params: {page, command, pageSize}})
    return res.data.data
}

export default {
    getWatcherStats,
    getWatcherRecords
}