import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase";
import slugify from "slugify";

function Register() {
  const [songName, setSongName] = useState("");
  const [songLink, setSongLink] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [dedication, setDedication] = useState("");
  const [slug, setSlug] = useState("");

  const handleSongNameChange = (e) => {
    const name = e.target.value;
    setSongName(name);
    const songSlug = slugify(name, { lower: true });
    setSlug(songSlug);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear un nuevo documento en la colección "songs" con los datos del formulario
      const docRef = await addDoc(collection(firestore, "songs"), {
        songName,
        songLink,
        addedBy,
        dedication,
        slug,
        addedAt: serverTimestamp(),
        seen: 0,
        liked: 0
      });

      console.log("Canción registrada con ID:", docRef.id);

      // Reiniciar los campos del formulario después de enviar
      setSongName("");
      setSongLink("");
      setAddedBy("");
      setDedication("");
      setSlug("");
    } catch (error) {
      console.error("Error al registrar la canción:", error);
    }
  };

  return (
    <div className="container">
      <h1>Registrar canción</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de la canción</label>
          <input
            type="text"
            className="form-control"
            value={songName}
            onChange={handleSongNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enlace de la canción</label>
          <input
            type="text"
            className="form-control"
            value={songLink}
            onChange={(e) => setSongLink(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Añadido por</label>
          <input
            type="text"
            className="form-control"
            value={addedBy}
            onChange={(e) => setAddedBy(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Carta de dedicatoria (máximo 3000 caracteres)</label>
          <textarea
            className="form-control"
            value={dedication}
            onChange={(e) => setDedication(e.target.value)}
            maxLength={3000}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            type="text"
            className="form-control"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar canción</button>
      </form>
    </div>
  );
}

export default Register;
