import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { inputCleaner } from "../helpers/inputCleaner";
import YoutubeEmbed from "./YoutubeEmbed";
import Youtube, { youtube } from "../helpers/youtube";
import { LuHeadphones, LuArrowLeft, LuArrowRight, LuAtom } from 'react-icons/lu';

function Song() {
  const { song } = useParams();
  const sanitized = inputCleaner(song);
  const [songData, setSongData] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Consultar todas las canciones
        const songsRef = collection(firestore, "songs");
        const querySnapshot = await getDocs(songsRef);

        if (!querySnapshot.empty) {
          // Almacenar todas las canciones en el estado
          const songsData = querySnapshot.docs.map((doc) => doc.data());
          setSongs(songsData);
        } else {
          // No se encontraron canciones
          console.log("No se encontraron canciones");
          setSongs([]);
        }
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoToSongs = () => {
    window.location.href = "/songs";
  };

  const handlePreviousSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentIndex(randomIndex);
  };

  const handleNextSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (!songData) {
    // No se encontró la canción correspondiente al slug
    return <h1>{sanitized}</h1>;
  }

  const { songName, songLink, dedication } = songData;

  return (
    <div className="background">
      <div className="container container-song">
        <h1 className="text-center titleword">
          <LuHeadphones /> {songName} <LuHeadphones />
        </h1>
        <YoutubeEmbed embedId={youtube(songLink)} />
        <p className="dedication">{dedication}</p>
        <hr />
        <div className="d-grid gap-2">
          <button className="btn btn-pinky" onClick={handleGoHome}>
            Ir a la página de inicio
          </button>
          <button className="btn btn-pinky" onClick={handleGoToSongs}>
            Ver lista de canciones
          </button>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary mx-2 btn-pinky"
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * songs.length);
              window.location.href = `/song/${songs[randomIndex].slug}`;
            }}
          >
            <LuAtom /> Canción random
          </button>
        </div>
      </div>
    </div>
  );
}

export default Song;
