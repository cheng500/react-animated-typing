/**
 * @flow
 */
'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import ChangingText from './ChangingText'
import TypingText from './TypingText'

const availableCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!/\\%$<E2><82><AC>&()=?+.,;:_<>#[]'

const AnimatedText = ({ tag: Tag = 'div', text, type, style, textStyle, ...props }: Object) => {
  const [random, setRandom] = React.useState(null)

  React.useEffect(() => {
    let res = ''
    for ( let i = 0; i < text.length; i++ ) {
      res += availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
    }
    setRandom(res)
  }, [text])

  return (
    <div style={{ ...style, position: 'relative' }}>
      <Tag style={{ ...textStyle, visibility: 'hidden' }}>{text}</Tag>
      { type == 'random'
        ? <ChangingText random={random} tag={Tag} text={text} textStyle={textStyle} {...props} />
        : <TypingText tag={Tag} text={text} textStyle={textStyle} {...props} />
      }
    </div>
  )
}

export default AnimatedText

AnimatedText.propTypes = {
  delay: PropTypes.number,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  speed: PropTypes.number,
  style: PropTypes.object,
  tag: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
}
