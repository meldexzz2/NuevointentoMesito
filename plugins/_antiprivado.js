export async function before(m, { conn, isOwner, isROwner}) {
  if (m.isGroup) return false; // solo se aplica a chats privados
  if (!isOwner &&!isROwner) {
    await conn.updateBlockStatus(m.chat, 'block'); // bloqueo silencioso
    return true; // evita procesar el mensaje
}
  return false;
}