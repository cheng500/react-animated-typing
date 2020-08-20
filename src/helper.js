/**
 * @flow
 */
'use strict'

export function toUnicode(str: string) {
  if ( ! str ) return ''
  let unicodeString = ''
  for (var i = 0; i < str.length; i++) {
    let unicode = str.charCodeAt(i).toString(16).toUpperCase()
    while (unicode.length < 4) {
      unicode = `0${unicode}`
    }
    unicode = `\\${unicode}`
    unicodeString += `${unicode} `
  }
  
  return unicodeString;
}
