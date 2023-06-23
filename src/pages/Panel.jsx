import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

function Panel() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const username = user?.displayName || "";
  const photoURL = user?.photoURL || "";

  return (
    <div className="container-panel">
      <h1>Panel de usuario</h1>
      {username && <p>Bienvenido, {username}</p>}
      {photoURL && <img src={photoURL} alt="Foto de perfil" />}
      <button onClick={handleSignOut}>Cerrar sesión</button>
    </div>
  );
}

export default Panel;
