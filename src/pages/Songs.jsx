import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

function Songs() {
  const [songList, setSongList] = useState([]);

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
            ...doc.data()
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
    <div>
      {songList.length === 0 ? (
        <p>No hay canciones aún</p>
      ) : (
        <ul>
          {songList.map((song) => (
            <li key={song.id}>
              <a href={'song/' + song.slug}>{song.songName}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Songs;
