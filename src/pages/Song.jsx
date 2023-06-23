import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { inputCleaner } from "../helpers/inputCleaner";
import YoutubeEmbed from "./YoutubeEmbed";
import Youtube, { youtube } from "../helpers/youtube";

function Song() {
  const { song } = useParams();
  const sanitized = inputCleaner(song);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        // Consultar la colección "songs" filtrando por el campo "slug"
        const songsRef = collection(firestore, "songs");
        const q = query(songsRef, where("slug", "==", sanitized));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Encontrar una canción con el slug correspondiente
          const songDoc = querySnapshot.docs[0];
          // Actualizar el estado con los datos de la canción encontrada
          setSongData(songDoc.data());
        } else {
          // No se encontró ninguna canción correspondiente al slug
          console.log("No se encontró la canción");
          setSongData(null);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la canción:", error);
      }
    };

    fetchSongData();
  }, [sanitized]);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoToSongs = () => {
    window.location.href = "/songs";
  };

  if (!songData) {
    // No se encontró la canción correspondiente al slug
    return <h1>{sanitized}</h1>;
  }

  const { songName, songLink, dedication } = songData;

  return (
    <div className="container mt-5 container-song">
      <h1 className="text-center">{songName}</h1>
      <YoutubeEmbed embedId={youtube(songLink)} />
      <p>{dedication}</p>
      <hr />
      <div className="d-grid gap-2">
        <button className="btn btn-primary" onClick={handleGoHome}>Ir a la página de inicio</button>
        <button className="btn btn-primary btn-block" onClick={handleGoToSongs}>Ver lista de canciones</button>
      </div>
    </div>
  );
}

export default Song;
