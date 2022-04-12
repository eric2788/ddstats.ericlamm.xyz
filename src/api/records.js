import api from './axios'

async function getDDRecords(uid, limit = 5) {
    const res = await api.get(`/records/${uid}`, { params: { limit } })
    return res.data.data
}


async function getSelfRecords(uid, limit = 5) {
    const res = await api.get(`/records/${uid}/self`, { params: { limit } })
    return res.data.data
}

export default {
    getDDRecords,
    getSelfRecords
}