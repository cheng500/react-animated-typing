/**
 * @flow
 */
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import AnimatedText from '../../src/AnimatedText'

const App = () => {
  const [disabled, setDisabled] = React.useState(true)

  return (
    <div>
      <AnimatedText
        text="Random Text Change"
        type="random"
        style={{ margin: 20 }}
      />
      <AnimatedText
        text="Typing Text Change"
        style={{ margin: 20 }}
      />
      <button style={{ margin: 20 }} onClick={() => setDisabled(! disabled)}>Click here to toggle below</button>
      <AnimatedText
        disabled={disabled}
        text="Disabled Random Text Change"
        tag="div"
        type="random"
        style={{ margin: 20 }}
      />
      <AnimatedText
        disabled={disabled}
        text="Disabled Typing Text Change"
        tag="div"
        style={{ margin: 20 }}
      />
    </div>
  )
}

const wrapper = document.getElementById("main")
wrapper && ReactDOM.render(<App />, wrapper)
