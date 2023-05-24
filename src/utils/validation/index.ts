export const URL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function validatePassword(value: string) {
  if (value.length < 8) {
    return "Password length can't be less than 8 characters.";
  } else if (!/^(?=.*[a-z])/.test(value)) {
    return "Password must include at least lowercase letter";
  } else if (!/^(?=.*[A-Z])/.test(value)) {
    return "Password must include at least uppercase letter";
  } else if (!/^(?=.*[!@#?$%^&*-_=+])/.test(value)) {
    return "Password must include a special character";
  } else {
    return "";
  }
}
