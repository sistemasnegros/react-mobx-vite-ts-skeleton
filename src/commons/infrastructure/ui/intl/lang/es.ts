import { ILangDomain } from "../../../../domain/int/lang.domain";

export const EsLang: ILangDomain = {
  FORM_FIELD_REQUIRED: "{fieldName} es requerido!",
  FORM_FIELD_EMAIL_INVALID: "{fieldName} es no es un email valido!",
  LOGIN: "Ingresar",
  // backend
  USER_OR_PASSWORD_INVALID: "Email o contraseña invalida!",
  // API ERROR
  ERR_NETWORK: "Conexión con el servidor no disponible!",

  ERR_NOT_FOUND: "No encontrado!",
  SUCCESS_LOGIN: "Bienvenido!",
  SUCCESS_CREATED: "Creación exitosa!",
  SUCCESS_UPDATED: "Actualización exitosa",
  SUCCESS_DELETED: "Eliminación exitosa",
  ERR_TOKEN: "Sesión Expirada!",
  ERR_EMAIL_ALREADY_EXISTS: "Email ya existe!",
  ERR_ID_ALREADY_EXISTS: "Id ya existe!",
};
