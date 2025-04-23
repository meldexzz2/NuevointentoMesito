
import axios from "axios";
import PhoneNumber from "google-libphonenumber";

let handler = async (m, { conn, args }) => {
  try {
    // Verificar ID del grupo o chat
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) ? args[0] : m.chat;

    // Obtener participantes únicos del chat
    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item.key.participant)
      .filter((value, index, self) => value && self.indexOf(value) === index);

    const participantesOrdenados = participantesUnicos.sort((a, b) =>
      a.split("@")[0].localeCompare(b.split("@")[0])
    );

    // Inicializar utilidad para números telefónicos
    const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance();
    const supportedRegions = PhoneNumber.MetadataManager.getSupportedRegions();

    // Construir lista de participantes con bandera, nombre y número
    const listaEnLinea = participantesOrdenados
      .map((k, i) => {
        let numero = k.split("@")[0]; // Extraer el número del participante
        let flag = "🌐"; // Bandera por defecto
        let nombre =
          conn.contacts[k]?.name || conn.contacts[k]?.notify || `Usuario desconocido`;

        // Validar y obtener la bandera del país
        try {
          let phoneNumber = phoneUtil.parseAndKeepRawInput(numero, "ZZ");
          if (phoneUtil.isValidNumber(phoneNumber)) {
            const regionCode = phoneUtil.getRegionCodeForNumber(phoneNumber);
            if (supportedRegions.includes(regionCode)) {
              flag = `:flag-${regionCode.toLowerCase()}:`; // Emoji bandera
            }
          }
        } catch (e) {
          console.error(`Error procesando el número ${numero}:`, e.message);
        }

        return `*${i + 1}.* ${flag} ${nombre} (@${numero})`;
      })
      .join("\n") || "No hay usuarios en línea en este momento.";

    // URL de la imagen para enviar
    const imgUrl = "https://i.postimg.cc/Vv73j0HY/IMG-6032.jpg";
    const responseImg = await axios.get(imgUrl, {
      responseType: "arraybuffer",
    });

    // Enviar imagen con la lista generada
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

    await m.react("✅"); // Reacción exitosa
  } catch (error) {
    console.error("Error general:", error.message);
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