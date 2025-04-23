
import axios from "axios";
import PhoneNumber from "google-libphonenumber";

let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;

    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item.key.participant)
      .filter((value, index, self) => self.indexOf(value) === index);

    const participantesOrdenados = participantesUnicos.sort((a, b) =>
      a.split("@")[0].localeCompare(b.split("@")[0])
    );
    const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance();
    const supportedRegions = PhoneNumber.MetadataManager.getSupportedRegions();

    const listaEnLinea =
      participantesOrdenados
        .map((k, i) => {
          let numero = k.split("@")[0]; // Número del participante
          let flag = "🌐"; // Bandera por defecto
          let nombre = conn.contacts[k]?.name || conn.contacts[k]?.notify

  
          try {
            let phoneNumber = phoneUtil.parseAndKeepRawInput(numero, "ZZ");
            if (phoneUtil.isValidNumber(phoneNumber)) {
              const regionCode = phoneUtil.getRegionCodeForNumber(phoneNumber);
              if (supportedRegions.includes(regionCode)) {
                flag = `:flag-${regionCode.toLowerCase()}:`;
              }
            }
          } catch (e) {
            console.error(`Error procesando el número ${numero}:`, e.message);
          }

          return `*${i + 1}.* ${flag} ${nombre} (@${numero})`;
        })
        .join("\n") || "No hay usuarios en línea en este momento.";

    // URL de la imagen
    const imgUrl = "https://i.postimg.cc/Vv73j0HY/IMG-6032.jpg";
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    await conn.sendFile(
      m.chat,
      responseImg.data,
      "thumbnail.png",
      `*🌐 Lista de usuarios en línea ahora ♡:*\n${listaEnLinea}\n\n`,
      m,
      {
        contextInfo: { mentionedJid: participantesOrdenados },
      }
    );

    await m.react("✅");
  } catch (error) {
    console.error(error);
    await m.reply("❌ Hubo un error al generar la lista de usuarios en línea.");
  }
};

// Configuración del comando
handler.help = ["listonline"];
handler.tags = ["grupo"];
handler.command = ["listonline", "online", "linea", "enlinea"];
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.register = true;

export default handler;