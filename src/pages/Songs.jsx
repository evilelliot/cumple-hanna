import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { LuMusic4, LuPlay } from 'react-icons/lu';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti'

function Songs() {
  const [songList, setSongList] = useState([]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Obtener la colección de canciones desde Firestore
    const fetchSongs = async () => {
      try {
        const songsCollection = collection(firestore, "songs");
        const snapshot = await getDocs(songsCollection);

        // Verificar si hay canciones disponibles
        if (snapshot.empty) {
          console.log("No hay canciones disponibles");
        } else {
          const songs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSongList(songs);
        }
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="background">
        <Confetti width={width} height={height} />
        <div className="list-container">
            <h4 style={{ textAlign: 'center' }} className="music">
                <LuMusic4 />
            </h4>
            <h4 className="text-center songs-list-title">Tenemos {songList.length} canciones para ti.</h4>
            {songList.length === 0 ? (
                <p>No hay canciones aún</p>
            ) : (
                <ul className="song-list">
                {songList.map((song) => (
                    <li key={song.id}>
                        <a href={"song/" + song.slug}><b>{<LuPlay />}</b> {song.songName}</a>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
}

export default Songs;
