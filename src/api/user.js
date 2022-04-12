import api from './axios'

async function getUserList(page, orderBy, desc = true, size = 30) {
    const res = await api.get('/user', { params: { page, size, orderBy, desc } })
    return res.data.data
}

async function getUser(uid) {
    const res = await api.get(`/user/${uid}`)
    return res.data.data
}

async function searchUser(q, page, orderBy, desc = true, size = 30) {
    const res = await api.get('/user/search', { params: { q, page, size, orderBy, desc } })
    return res.data.data
}

export default {
    getUserList,
    getUser,
    searchUser
}