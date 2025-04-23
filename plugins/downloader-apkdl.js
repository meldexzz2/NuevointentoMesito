
import axios from "axios";

let handler = async (m, { conn, args }) => {
  try {
    // Validación de argumentos
    if (!args[0]) {
      return m.reply(
        "❌ Por favor, proporciona el nombre de la aplicación que deseas descargar.\nEjemplo: .apk Whatsapp"
      );
    }

    const appName = args.join(" "); // Unir argumentos en caso de múltiples palabras
    m.reply(`🔄 Buscando el APK de *${appName}*, por favor espera...`);

    // URL de la API de Dorratz
    const apiUrl = `https://api.dorratz.com/v2/apk-dl?text=${encodeURIComponent(appName)}`;

    // Realizar la solicitud a la API
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.status) {
      return m.reply(`❌ No se encontró la aplicación *${appName}*. Intenta con otro nombre.`);
    }

    const apkData = response.data.data;

    // Descripción de la aplicación
    let description = `🌐 *Información del APK*:\n`;
    description += `📌 *Nombre:* ${apkData.name}\n`;
    description += `🏢 *Desarrollador:* ${apkData.developer || "No especificado"}\n`;
    description += `📅 *Publicado:* ${apkData.publish || "No disponible"}\n`;
    description += `🗂️ *Tamaño:* ${apkData.size || "Desconocido"}\n`;
    description += `📥 *Descargas:* ${apkData.stats?.downloads?.toLocaleString() || "N/A"}\n`;
    description += `⭐ *Rating:* ${apkData.stats?.rating?.average || "N/A"} (${apkData.stats?.rating?.total || 0} valoraciones)\n\n`;
    description += `_📲 Presiona el botón abajo para descargar el APK._`;

    // Botón de descarga
    const buttons = [
      {
        buttonId: `${conn.usedPrefix}apkdl`,
        buttonText: { displayText: "📥 Descargar APK" },
        type: 1,
      },
    ];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: apkData.image },
        caption: description,
        buttons: buttons,
        viewOnce: true,
      },
      { quoted: m }
    );

    // Guardar sesión de búsqueda
    global.apkSession = { apkData };
  } catch (error) {
    console.error("❌ Error general:", error);
    return m.reply("❌ Hubo un error al buscar el APK. Por favor, intenta nuevamente.");
  }
};

// Rama: Descarga del APK
const handlerDownload = async (m, { conn }) => {
  try {
    if (!global.apkSession || !global.apkSession.apkData) {
      return m.reply(`❗ No hay sesión activa. Primero busca una aplicación con el comando .apk <nombre>.`);
    }

    const { apkData } = global.apkSession;

    await conn.sendMessage(
      m.chat,
      {
        document: { url: apkData.download },
        mimetype: "application/vnd.android.package-archive",
        fileName: `${apkData.name}.apk`,
        caption: `📦 *${apkData.name}*\n✅ APK listo para descargar.`,
      },
      { quoted: m }
    );

    global.apkSession = null; // Limpiar la sesión después de la descarga
  } catch (error) {
    console.error("❌ Error al descargar el APK:", error);
    m.reply("❌ Hubo un error al descargar el APK.");
  }
};

// Registro de comandos
handler.command = ["apk"];
handlerDownload.command = ["apk"];

export default [handler, handlerDownload];