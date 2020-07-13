/**
 * @flow
 */
'use strict'

import React from 'react'

const availableCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!/\\%$€&()=?+.,;:_<>#[]'

const ChangingText = (props) => {
  const { alwaysRefresh, disabled, href, text, tag: Tag, delay, speed = 100, style, textStyle, type } = props
  const [isComplete, setIsComplete] = React.useState(false)
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    let i = 0
    let animation
    let timeout
    if ( ! disabled ) {
      timeout = setTimeout(() => {
        animation = setInterval(() => {
          let val = ''
          for ( let j = 0; j < text.length; j++ ) {
            if ( j <= i || text[j] == ' ' ) {
              val += text[j]
            } else {
              val += availableCharacters[Math.floor(Math.random(0, 1) * availableCharacters.length)]
            }
          }
          i++

          if ( i >= text.length ) {
            clearInterval(animation)
            setValue(text)
            setIsComplete(true)
          } else {
            setValue(val)
          }
        }, speed)
      }, delay)
    } else {
      let val = ''
      for ( let j = 0; j < text.length; j++ ) {
        if ( text[j] == ' ' ) {
          val += text[j]
        } else {
          val += availableCharacters[Math.floor(Math.random(0, 1) * availableCharacters.length)]
        }
      }
      setValue(val)
    }

    return () => {
      animation && clearInterval(animation)
      timeout && clearTimeout(timeout)
    }
  }, [alwaysRefresh && props, text, disabled])

  return (
    <div style={{ position: 'relative', ...style}}>
      <Tag style={{ display: 'block', visibility: 'hidden', ...textStyle }}>{value.length > text.length ? value : text}</Tag>
      <Tag href={href} style={{ position: 'absolute', top: 0, ...textStyle }}>{value}</Tag>
    </div>
  )
}

export default ChangingText
