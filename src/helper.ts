export function toUnicode(str) {
  if (!str) return "";
  let unicodeString = "";
  for (let i = 0; i < str.length; i++) {
    let unicode = str.charCodeAt(i).toString(16).toUpperCase();
    while (unicode.length < 4) {
      unicode = `0${unicode}`;
    }
    unicode = `\\${unicode}`;
    unicodeString += `${unicode} `;
  }

  return unicodeString;
}
