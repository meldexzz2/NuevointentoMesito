
let handler = async (m, { conn }) => {
    try {
        const user = global.db.data.users[m.sender];
        const cooldown = 0; // Cambiar a 36000000 (10 horas) o 86400000 (24 horas) según el caso

        if (new Date() - user.lastcofre < cooldown) {
            const remainingTime = msToTime(cooldown - (new Date() - user.lastcofre));
            throw `❗ 𝐈𝐍𝐅𝐎 ❗ 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\n𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${remainingTime}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`;
        }

        const img = 'https://i.postimg.cc/Vv73j0HY/IMG-6032.jpg';
        const texto = `
        🤖 *Guía básica de comandos:*

        - .on/off audios
        - .todos *(Etiqueta al grupo con mención)*
        - .noti y mensaje *(Notifica al grupo sin mención)*
        - .grupo abrir/cerrar *(Abre o cierra el grupo)*
        - .fantasmas *(Muestra los inactivos)*
        - .on/off welcome *(Activa/desactiva bienvenidas y despedidas)*
        - .setwelcome Texto @user *(Configura mensaje de bienvenida)*
        - .setbye Texto @user *(Configura mensaje de despedida)*
        - .promote @tag *(Da admin a alguien)*
        - .demote @tag *(Retira admin a alguien)*
        - .on modoadmin *(Bot solo para admins)*
        - .off modoadmin *(Bot para uso general)*
        - .bot Texto *(Habla con el Bot)*
        - .del *(Elimina mensaje de alguien)*
        - .menu *(Muestra todos los comandos del bot)*
        `;

        const fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };

  
        await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak);

        // Actualiza el tiempo de última reclamación
        user.lastcofre = new Date().getTime();

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, error, m);
    }
};

handler.command = ['guia'];
handler.register = true;

export default handler;