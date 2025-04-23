
import axios from "axios";

let handler = async (m, { conn, args }) => {
  try {
    // Validar si el usuario proporciona un nombre de la aplicación
    if (!args[0]) {
      return m.reply(
        "❌ Por favor, proporciona el nombre de la aplicación que deseas descargar.\nEjemplo: .apk Whatsapp"
      );
    }

    const appName = args.join(" "); // Unir argumentos en caso de múltiples palabras
    m.reply(`🔍 Buscando el APK de *${appName}*. Por favor espera un momento...`);

    // Llamada a la API para obtener la información del APK
    const apiUrl = `https://api.dorratz.com/v2/apk-dl?text=${encodeURIComponent(appName)}`;
    const response = await axios.get(apiUrl);

    // Validar la respuesta de la API
    if (!response.data || !response.data.status) {
      return m.reply(`❌ No se encontró la aplicación *${appName}*. Intenta con otro nombre.`);
    }

    const apkData = response.data.data; // Información del APK

    // Descripción de la aplicación
    let description = `🌐 *Información del APK*:\n`;
    description += `📌 *Nombre:* ${apkData.name}\n`;
    description += `🏢 *Desarrollador:* ${apkData.developer || "No especificado"}\n`;
    description += `📅 *Publicado:* ${apkData.publish || "No disponible"}\n`;
    description += `🗂️ *Tamaño:* ${apkData.size || "Desconocido"}\n`;
    description += `📥 *Descargas:* ${apkData.stats?.downloads?.toLocaleString() || "N/A"}\n`;
    description += `⭐ *Rating:* ${apkData.stats?.rating?.average || "N/A"} (${apkData.stats?.rating?.total || 0} valoraciones)\n\n`;
    description += `_📲 Iniciando descarga del APK..._`;

    // Enviar detalles al usuario
    await conn.sendMessage(
      m.chat,
      {
        image: { url: apkData.image },
        caption: description,
      },
      { quoted: m }
    );

    // Descargar y enviar el APK
    const downloadUrl = apkData.download;
    await conn.sendMessage(
      m.chat,
      {
        document: { url: downloadUrl },
        mimetype: "application/vnd.android.package-archive",
        fileName: `${apkData.name}.apk`,
        caption: `📦 *${apkData.name}*\n✅ Aquí tienes tu APK listo para instalar.`,
      },
      { quoted: m }
    );

  } catch (error) {
    console.error("❌ Error al buscar o descargar el APK:", error);
    m.reply("❌ Hubo un error al buscar o descargar el APK. Por favor, inténtalo nuevamente.");
  }
};

// Registro de comandos
handler.command = ["apk"];

export default handler;