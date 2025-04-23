
import axios from "axios";
import fs from "fs";
import path from "path";

const handler = async (m, { conn, args }) => {
  try {
    // Validación de argumentos
    if (!args[0]) {
      return m.reply("❌ Por favor, proporciona el nombre de la aplicación que deseas descargar.\nEjemplo: .apk Whatsapp");
    }

    const appName = args.join(" "); // Une los argumentos en caso de tener varias palabras
    const apiUrl = `https://delirius-apiofc.vercel.app/download/apk?query=${encodeURIComponent(appName)}`;
    
    m.reply(`🔄 Buscando y descargando el APK de *${appName}*, por favor espera...`);

    // Realiza la solicitud a la API
    const response = await axios({
      url: apiUrl,
      method: "GET",
      responseType: "stream", // Descarga el archivo como flujo de datos
    });

    // Define el nombre del archivo y la ruta donde se guardará
    const fileName = `${appName.replace(/\s+/g, "_")}.apk`;
    const filePath = path.resolve("./", fileName);

    // Guarda el archivo descargado localmente
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    // Asegura que el archivo se guarde correctamente
    writer.on("finish", async () => {
      m.reply(`✅ Descarga completa. Enviando el archivo APK de *${appName}*...`);
      
      // Envía el archivo al chat
      await conn.sendFile(
        m.chat,
        filePath,
        fileName,
        `📦 Aquí tienes el APK de *${appName}*. ¡Disfruta!`,
        m
      );

      // Elimina el archivo local después de enviarlo
      fs.unlinkSync(filePath);
    });

    writer.on("error", (err) => {
      console.error(err);
      m.reply("❌ Hubo un error al guardar el archivo APK.");
    });
  } catch (error) {
    console.error(error);
    m.reply("❌ Hubo un error al descargar el archivo APK. Por favor, inténtalo nuevamente.");
  }
};

handler.help = ["apk"];
handler.tags = ["tools"];
handler.command = ["apk"];

export default handler;