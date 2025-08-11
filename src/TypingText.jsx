import styled, { css, keyframes } from 'styled-components'
import { toUnicode } from './helper'

const TypingText = styled(({ delay, disabled, speed, tag: Tag, text, textStyle, ...props }) => <Tag style={{...textStyle, position: 'absolute', top: 0, left: 0 }} {...props} />)`&:before{
  ${({ disabled, speed, text }) => {
    if ( disabled ) return
    const duration = text.length * speed
    let helper = `0% { content: "${toUnicode('_')}" }`
    for ( let i = 0; i < text.length; i++ ) {
      helper += `${(i + 1)/text.length * 100}% { content: "${toUnicode(`${text.substr(0, i + 1)}${i != text.length - 1 ? i % 2 ? '' : '_' : ''}`)}" } `
    }
    const animation = keyframes`${helper}`
    return css`animation: ${animation} ${duration}ms linear forwards`
  }};
  content: '';
  display: block;
  -webkit-animation-delay: ${({delay}) => delay}ms;
  animation-delay: ${({delay}) => delay}ms;
}`

export default TypingText