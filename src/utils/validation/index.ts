export const URL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function validatePassword(value: string) {
  if (value.length < 4) {
    return "Password length can't be less than 4 characters.";
  } else {
    return "";
  }
}
