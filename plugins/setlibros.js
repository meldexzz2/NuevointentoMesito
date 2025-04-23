let handler = async (m, { conn, text, isROwner, isOwner }) => {
    if (text) {
        global.db.data.chats[m.chat].setlibros = text
        conn.reply(m.chat, '𝙀𝙡 𝙘𝙖𝙩á𝙡𝙤𝙜𝙤 𝙙𝙚 𝙡𝙞𝙗𝙧𝙤𝙨 𝙝𝙖 𝙨𝙞𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙤.', m)
    } else throw `𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙚𝙡 𝙘𝙖𝙩á𝙡𝙤𝙜𝙤 𝙙𝙚 𝙡𝙞𝙗𝙧𝙤𝙨 𝙦𝙪𝙚 𝙙𝙚𝙨𝙚𝙖𝙨 𝙢𝙤𝙨𝙩𝙧𝙖𝙧, 𝙚𝙟𝙚𝙢𝙥𝙡𝙤:
.𝙨𝙚𝙩𝙡𝙞𝙗𝙧𝙤𝙨 📚 𝙇𝙞𝙗𝙧𝙤𝙨 𝙙𝙞𝙨𝙥𝙤𝙣𝙞𝙗𝙡𝙚𝙨: 1. 𝘾𝙞𝙚𝙣 𝙖ñ𝙤𝙨 𝙙𝙚 𝙨𝙤𝙡𝙚𝙙𝙖𝙙...`
}

handler.command = ['setlibros']
handler.admin = true
handler.group = true
export default handler
