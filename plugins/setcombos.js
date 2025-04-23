let handler = async (m, { conn, text, isROwner, isOwner }) => {
    if (text) {
        global.db.data.chats[m.chat].setcombos = text
        conn.reply(m.chat, '𝙇𝙤𝙨 𝙘𝙤𝙢𝙗𝙤𝙨 𝙝𝙖𝙣 𝙨𝙞𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙤𝙨.', m)
    } else throw `𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙡𝙤𝙨 𝙘𝙤𝙢𝙗𝙤𝙨 𝙦𝙪𝙚 𝙙𝙚𝙨𝙚𝙖𝙨 𝙤𝙛𝙧𝙚𝙘𝙚𝙧, 𝙚𝙟𝙚𝙢𝙥𝙡𝙤:
.𝙨𝙚𝙩𝙘𝙤𝙢𝙗𝙤𝙨 🔥 𝘾𝙤𝙢𝙗𝙤 1: 2 𝙥𝙧𝙤𝙙𝙪𝙘𝙩𝙤𝙨 𝙥𝙤𝙧 $100`
}

handler.command = ['setcombos']
handler.admin = true
handler.group = true
export default handler
