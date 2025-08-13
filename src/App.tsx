import { useState } from "react";
import AnimatedText from "./AnimatedText";

export default function App() {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <AnimatedText text="Random Text Change" tag="div" type="random" style={{ margin: 20 }} />
      <AnimatedText text="Typing Text Change" tag="div" style={{ margin: 20 }} />
      <button style={{ margin: 20 }} onClick={() => setDisabled(!disabled)}>
        Click here to toggle below
      </button>
      <AnimatedText
        disabled={disabled}
        text="Disabled Random Text Change"
        tag="div"
        type="random"
        style={{ margin: 20 }}
      />
      <AnimatedText disabled={disabled} text="Disabled Typing Text Change" tag="div" style={{ margin: 20 }} />
    </div>
  );
}
