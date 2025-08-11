import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import AnimatedText from './AnimatedText'

const App = () => {
  const [disabled, setDisabled] = useState(true)

  return (
    <div>
      <AnimatedText
        text="Random Text Change"
        tag="div"
        type="random"
        style={{ margin: 20 }}
      />
      <AnimatedText
        text="Typing Text Change"
        tag="div"
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

const rootElement = document.getElementById('root')
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
