
import FormData from "form-data";
import axios from "axios";

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Validación inicial: verifica si el usuario respondió a una imagen
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime) {
      throw `╰⊱❗️⊱ *USO INCORRECTO* ⊱❗️⊱╮\n\nENVÍA O RESPONDE A UNA IMAGEN USANDO EL COMANDO ${usedPrefix + command}`;
    }
    if (!/image\/(jpe?g|png)/.test(mime)) {
      throw `╰⊱⚠️⊱ *ADVERTENCIA* ⊱⚠️⊱╮\n\nEL FORMATO DE ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO EN FORMATO JPG O PNG`;
    }

    // Aviso al usuario mientras la imagen está siendo procesada
    m.reply("*🐈 MEJORANDO LA CALIDAD DE LA IMAGEN...*");

    // Descarga la imagen del mensaje citado
    let img = await q.download();
    if (!img) {
      throw "❌ Error al descargar la imagen, inténtalo nuevamente.";
    }

    // Llama a la función para mejorar la calidad de la imagen
    let pr = await remini(img, "enhance");
    if (!pr) {
      throw "❌ Error al procesar la imagen, por favor inténtalo nuevamente.";
    }

    // Envío de la imagen mejorada
    await conn.sendMessage(
      m.chat,
      { image: pr, caption: "✨ ¡Aquí tienes tu imagen mejorada en HD!" },
      { quoted: m }
    );

  } catch (error) {
    console.error("Error general:", error.message || error);
    throw "❌ Ocurrió un error al procesar la imagen, por favor inténtalo nuevamente.";
  }
};

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["remini", "hd", "enhance"];

export default handler;

// Función para mejorar la imagen
async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    operation = availableOperations.includes(operation) ? operation : "enhance";

    const apiUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {
      filename: "enhance_image.jpg",
      contentType: "image/jpeg",
    });
    formData.append("model_version", "1");

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: formData.getHeaders(),
      });

      // Validación de respuesta de la API
      if (response.status !== 200 || !response.data) {
        throw new Error("La API no devolvió una imagen válida.");
      }

      // Convierte los datos a Buffer para enviar la imagen procesada
      resolve(Buffer.from(response.data));
    } catch (err) {
      console.error("Error en la API Remini:", err.message || err);
      reject(err);
    }
  });
}