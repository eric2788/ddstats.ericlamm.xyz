

export function convertRecords(records){
    if (!records) return records
    for(const record of records){

        if (record.vup_face) {
            record.vup_face = toHttps(record.vup_face)
        }

        if (record.image.Valid){
            record.image.String = toHttps(record.image.String)
        }

        if (record.created_at){
            record.created_at = new Date(record.created_at).toLocaleString()
        }
    }

    return records
}

export function convertUsers(users){
    if (!users) return users
    for(const vup of users){

        if (vup.face){
            vup.face = toHttps(vup.face)
        }

        vup.last_listened_at = vup.listening ? "现在" : new Date(vup.last_listened_at).toLocaleString()
        vup.last_behaviour_at = vup.last_behaviour_at ? new Date(vup.last_behaviour_at).toLocaleString() : "无"

        if (vup.first_listen_at) {
            vup.first_listen_at = new Date(vup.first_listen_at).toLocaleString()
        }
    }

    return users
}


function toHttps(url){
    if (url.startsWith('http://')) {
        return url.replace('http://', 'https://')
    }
    return url
}