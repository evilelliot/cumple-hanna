export function youtube(url) {
    // Expresión regular para extraer el ID del video
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/)|youtu\.be\/)([^#\&\?]*).*/;
    const match = url.match(regex);
  
    if (match && match[1]) {
      return match[1];
    }
  
    return null; // Si el enlace no es un enlace válido de YouTube
  }  