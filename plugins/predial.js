let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setpredial) {
        let predial = chat.setpredial;
        await conn.reply(m.chat, predial, m);
    } else {
        m.reply(`𝙉𝙤 𝙨𝙚 𝙝𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙙𝙤 𝙥𝙧𝙚𝙙𝙞𝙖𝙡, 𝙪𝙨𝙖 .𝙨𝙚𝙩𝙥𝙧𝙚𝙙𝙞𝙖𝙡 𝙥𝙖𝙧𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧𝙡𝙤.`);
    }
}
handler.command = ['predial'];
handler.group = true;
export default handler;
