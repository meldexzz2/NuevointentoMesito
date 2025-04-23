let handler = async (m, { conn }) => {
    let chat = global.db.data.chats[m.chat]
    if (chat.setlibros) {
        let libros = chat.setlibros;
        await conn.reply(m.chat, libros, m);
    } else {
        m.reply(`𝙉𝙤 𝙨𝙚 𝙝𝙖 𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙙𝙤 𝙡𝙞𝙗𝙧𝙤𝙨, 𝙪𝙩𝙞𝙡𝙞𝙯𝙖 .𝙨𝙚𝙩𝙡𝙞𝙗𝙧𝙤𝙨 𝙥𝙖𝙧𝙖 𝙙𝙚𝙛𝙞𝙣𝙞𝙧 𝙪𝙣𝙤.`);
    }
}
handler.command = ['libros'];
handler.group = true;
export default handler;
