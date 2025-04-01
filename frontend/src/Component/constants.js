// constants.js
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;


export function isValidPassword(password) {
  return PASSWORD_REGEX.test(password);
}