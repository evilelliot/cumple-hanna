import CryptoJS from "crypto-js";
import { encryptionKey, salt } from "../config";

export const encrypter = (password) => {
  try {
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();
    return encryptedPassword;
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    throw new Error("No se pudo encriptar la contraseña");
  }
};
