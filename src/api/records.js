import api from './axios'


async function getRecordsByType(uid, type = 'dd', limit = 15){
    const res = await api.get(`/records/${uid}`, { params: { limit, type } })
    return res.data.data
}

async function getGlobalRecords(q, page, showSelf = true, command = '', pageSize = 30){
    const res = await api.get(`/records`, { params: {q, page, pageSize, showSelf, command}})
    return res.data.data
}

export default {
    getRecordsByType,
    getGlobalRecords
}