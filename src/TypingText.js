/**
 * @flow
 */
'use strict'

import React from 'react'

const TypingText = (props) => {
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
          setValue(text.substring(0, i++) + (i % 2 ? '' : '_'))
          if ( i >= text.length ) {
            clearInterval(animation)
            setValue(text)
            setIsComplete(true)
          }
        }, speed)
      }, delay)
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

export default TypingText
