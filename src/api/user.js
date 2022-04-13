import api from './axios'

async function getUser(uid) {
    const res = await api.get(`/user/${uid}`)
    return res.data.data
}

async function searchUser(q, page, orderBy, desc = true, size = 30) {
    const res = await api.get('/user', { params: { q, page, size, orderBy, desc } })
    return res.data.data
}

export default {
    getUser,
    searchUser
}