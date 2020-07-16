/**
 * @flow
 */
'use strict'

import React from 'react'
import PropTypes from 'prop-types';

import ChangingText from './ChangingText'
import TypingText from './TypingText'

const AnimatedText = (props: Object) => {
  const { type } = props

  return (
    type == 'random'
    ? <ChangingText {...props} />
    : <TypingText {...props} />
  )
}

export default AnimatedText

AnimatedText.propTypes = {
  alwaysRefresh: PropTypes.bool,
  delay: PropTypes.number,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  speed: PropTypes.number,
  style: PropTypes.object,
  tag: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  type: PropTypes.string,
}
