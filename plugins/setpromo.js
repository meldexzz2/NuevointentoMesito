let handler = async (m, { conn, text, isROwner, isOwner }) => {
    if (text) {
        global.db.data.chats[m.chat].setpromo = text
        conn.reply(m.chat, '𝙇𝙖𝙨 𝙥𝙧𝙤𝙢𝙤𝙘𝙞𝙤𝙣𝙚𝙨 𝙝𝙖𝙣 𝙨𝙞𝙙𝙤 𝙖𝙘𝙩𝙪𝙖𝙡𝙞𝙯𝙖𝙙𝙖𝙨.', m)
    } else throw `𝙀𝙨𝙘𝙧𝙞𝙗𝙚 𝙡𝙖𝙨 𝙥𝙧𝙤𝙢𝙤𝙘𝙞𝙤𝙣𝙚𝙨 𝙖𝙘𝙩𝙞𝙫𝙖𝙨, 𝙚𝙟𝙚𝙢𝙥𝙡𝙤:
.𝙨𝙚𝙩𝙥𝙧𝙤𝙢𝙤 🎉 𝙋𝙧𝙤𝙢𝙤 𝙙𝙚𝙡 𝙢𝙚𝙨: 3𝙓2 𝙚𝙣 𝙩𝙤𝙙𝙤𝙨 𝙡𝙤𝙨 𝙥𝙧𝙤𝙙𝙪𝙘𝙩𝙤𝙨`
}

handler.command = ['setpromo']
handler.admin = true
handler.group = true
export default handler
