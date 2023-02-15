
const constraints = {
    commands: [
        {
            title: '所有',
            command: '',
            pricable: false,
        },
        {
            title: '发送弹幕',
            command: 'DANMU_MSG',
            pricable: false,
        },
        {
            title: '进入直播间',
            command: 'INTERACT_WORD',
            pricable: false,
        },
        {
            title: '上舰',
            command: 'USER_TOAST_MSG',
            pricable: true,
        },
        {
            title: '送礼',
            command: 'SEND_GIFT',
            pricable: true,
        },
        {
            title: '发送SC',
            command: 'SUPER_CHAT_MESSAGE',
            pricable: true,
        }
    ]
}

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

// convert  { command, count, price } to { title, count, price }
// and add the commands that behaviours don't have
export function convertBehaviours(behaviours) {
    return constraints.commands.filter(v => !!v).map(c => {
        const behaviour = behaviours?.find(b => b.command === c.command)
        return {
            title: c.title,
            count: behaviour?.count ?? 0,
            price: behaviour?.price ?? 0
        }
    })
}

export function isPricable(command) {
    return constraints.commands.find(c => c.command === command)?.pricable ?? false
}

export function getCommandByTitle(title){
    const command = constraints.commands.find(c => c.title === title)
    return command?.command ?? ''
}

export function getTitles() {
    return constraints.commands.map(c => c.title)
}

export function getErrorMessage(err){
    if (err?.response) {
        return err?.response?.data?.msg ??
          err?.response?.data?.message ??
          err?.response?.statusText;
      } else {
        return err?.message ?? err?.toString();
      }
}