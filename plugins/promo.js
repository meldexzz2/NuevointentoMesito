let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setpromo) {
        let promo = chat.setpromo;
        await conn.reply(m.chat, promo, m);
    } else {
        m.reply(`𝙉𝙤 𝙝𝙖𝙮 𝙥𝙧𝙤𝙢𝙤𝙘𝙞𝙤𝙣𝙚𝙨 𝙖𝙘𝙩𝙞𝙫𝙖𝙨, 𝙪𝙨𝙖 .𝙨𝙚𝙩𝙥𝙧𝙤𝙢𝙤 𝙥𝙖𝙧𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙚𝙧𝙡𝙖𝙨.`);
    }
}
handler.command = ['promo'];
handler.group = true;
export default handler;
