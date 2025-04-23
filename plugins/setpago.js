let handler = async (m, { conn, text, isROwner, isOwner }) => {
    if (text) {
        global.db.data.chats[m.chat].setpago = text
        conn.reply(m.chat, '𝙇𝙖𝙨 𝙞𝙣𝙛𝙤𝙧𝙢𝙖𝙘𝙞𝙤𝙣𝙚𝙨 𝙙𝙚 𝙥𝙖𝙜𝙤 𝙙𝙚𝙨𝙚𝙖𝙙𝙖𝙨.', m)
    } else throw `𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙡𝙖𝙨 𝙞𝙣𝙛𝙤𝙧𝙢𝙖𝙘𝙞𝙤𝙣𝙚𝙨 𝙙𝙚 𝙥𝙖𝙜𝙤 𝙦𝙪𝙚 𝙙𝙚𝙨𝙚𝙖𝙨 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧, 𝙚𝙟𝙚𝙢𝙥𝙡𝙤:
.𝙨𝙚𝙩𝙥𝙖𝙜𝙤 𝘾𝙪𝙚𝙣𝙩𝙖: 1234 5678 9012 3456 𝘽𝙖𝙣𝙘𝙤: 𝘽𝘽𝙑𝘼`
}

handler.command = ['setpago']
handler.admin = true
handler.group = true
export default handler
