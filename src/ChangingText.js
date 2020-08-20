/**
 * @flow
 */
'use strict'

import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { toUnicode } from './helper'

const ChangingText = styled(({ delay, random, speed, tag: Tag, textStyle, ...props }) => {
  return <Tag style={{...textStyle, position: 'absolute', top: 0, left: 0 }} {...props}/>
})`&:before{
  ${({ delay, disabled, speed = 100, random, text }) => {
    if ( disabled || ! random ) return

    const duration = text.length * speed
    let helper = `0% { content: "${random}" }`
    for ( let i = 0; i < text.length; i++ ) {
      helper += `${(i + 1)/text.length * 100}% { content: "${toUnicode(`${text.substr(0, i + 1)}${random.substr(i + 1, text.length - 1)}`)}" } `
    }
    const animation = keyframes`${helper}`
    return css`animation: ${animation} ${duration}ms linear forwards`
  }};
  content: '${({random}) => toUnicode(random)}';
  display: block;
  -webkit-animation-delay: ${({delay}) => delay}ms;
  animation-delay: ${({delay}) => delay}ms;
}`

export default ChangingText
