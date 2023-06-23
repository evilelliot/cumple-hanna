import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const handleSignup = async () => {
    try {
      // Iniciar sesión con Google
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // Redirigir a la vista Panel
      window.location.href = "/panel";
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <div className="form-group">
          <h1 className="text-center">Regístrate</h1>
        </div>
        <div className="form-group mt-3">
          <button className="btn btn-block btn-primary" onClick={handleSignup}>
            Regístrate con Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
