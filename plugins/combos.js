let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setcombos) {
        let combos = chat.setcombos;
        await conn.reply(m.chat, combos, m);
    } else {
        m.reply(`𝙉𝙤 𝙝𝙖𝙮 𝙘𝙤𝙢𝙗𝙤𝙨 𝙙𝙞𝙨𝙥𝙤𝙣𝙞𝙗𝙡𝙚𝙨, 𝙪𝙨𝙖 .𝙨𝙚𝙩𝙘𝙤𝙢𝙗𝙤𝙨 𝙥𝙖𝙧𝙖 𝙖𝙜𝙧𝙚𝙜𝙖𝙧.`);
    }
}
handler.command = ['combos'];
handler.group = true;
export default handler;
