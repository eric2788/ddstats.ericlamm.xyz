import api from './axios'


async function getGlobalStats(type, top = 10){
    const res = await api.get('/watcher/stats', {params: {type, top}})
    return res.data.data
}

async function getCommandStatus(command, price = false, top = 10) {
    const res = await api.get(`/watcher/stats/command/${command}`, { params: { top, price } })
    return res.data.data
}

async function getWatcherRecords(uid, page, command = '', pageSize = 30){
    const res = await api.get(`/watcher/record/${uid}`, {params: {page, command, pageSize}})
    return res.data.data
}

async function getWatcher(uid) {
    const res = await api.get(`watcher/${uid}`)
    return res.data.data
}

async function getWatcherStats(uid) {
    const res = await api.get(`watcher/stats/${uid}`)
    return res.data.data
}

async function getWatcherStatsByCommand(uid, command, price = false, limit = 10){
    const res = await api.get(`/watcher/stats/${uid}/${command}`, { params: { limit, price }})
    return res.data.data
}

export default {
    getGlobalStats,
    getCommandStatus,
    getWatcherStats,
    getWatcherRecords,
    getWatcher,
    getWatcherStatsByCommand
}