import { ILangDomain } from "../../../../domain/int/lang.domain";

export const EnLang: ILangDomain = {
  FORM_FIELD_REQUIRED: "{fieldName} is required!",
  FORM_FIELD_EMAIL_INVALID: "{fieldName} is not a valid email!",
  LOGIN: "Login",
  // backend
  USER_OR_PASSWORD_INVALID: "Email or password invalid!",
  // API ERROR
  ERR_NETWORK: "Server connection not available!",
  ERR_NOT_FOUND: "Not found",
  SUCCESS_LOGIN: "Welcome!",
  SUCCESS_CREATED: "Successfully created!",
  SUCCESS_UPDATED: "Successfully updated!",
  SUCCESS_DELETED: "Successfully deleted!",
};
