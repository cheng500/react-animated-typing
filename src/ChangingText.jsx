import { memo } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { toUnicode } from './helper'

const ChangingText = memo(styled(({ delay, disabled, random, speed, tag: Tag, text, textStyle, ...props }) => {
  return <Tag style={{...textStyle, position: 'absolute', top: 0, left: 0 }} {...props} />
})`&:before{
  ${({ disabled, speed, random, text }) => {
    if ( disabled || ! random ) return

    const duration = text.length * speed
    let helper = `0% { content: "${random}" }`
    for ( let i = 0; i < text.length; i++ ) {
      helper += `${(i + 1)/(text.length - 1) * 100}% { content: "${toUnicode(`${text.substr(0, i + 1)}${random.substr(i + 1, text.length - 1)}`)}" } `
    }
    helper += `100% { content: "${text}"; }`
    const animation = keyframes`${helper}`
    return css`animation: ${animation} ${duration}ms linear forwards`
  }};
  content: '${({random}) => toUnicode(random)}';
  display: block;
  -webkit-animation-delay: ${({delay}) => delay}ms;
  animation-delay: ${({delay}) => delay}ms;
}`, (prevProps, nextProps) => prevProps.disabled == nextProps.disabled && prevProps.text == nextProps.text)

export default ChangingText