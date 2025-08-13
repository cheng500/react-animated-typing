import { CSSProperties, useEffect, useState } from "react";
import "./ChangingText.css";

type Props = {
  delay?: number;
  disabled?: boolean;
  speed?: number;
  tag?: keyof HTMLElementTagNameMap;
  text: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  random?: string;
};

export default function ChangingText({
  delay = 0,
  disabled,
  random,
  speed = 100,
  tag: Tag = "div",
  text,
  textStyle,
}: Props) {
  const [animationName, setAnimationName] = useState<string | null>(null);

  useEffect(() => {
    if (disabled || !random) return;

    let keyframes = `@keyframes reveal-${text.replace(/\s+/g, "-")}{`;
    keyframes += `0% { content: "${random}"; }`;

    for (let i = 0; i < text.length; i++) {
      const percent = ((i + 1) / (text.length - 1)) * 100;
      const partial = text.substring(0, i + 1) + random.substring(i + 1);
      keyframes += `${percent}% { content: "${partial}"; }`;
    }

    keyframes += `100% { content: "${text}"; }`;
    keyframes += `}`;

    const styleTag = document.createElement("style");
    styleTag.innerHTML = keyframes;
    document.head.appendChild(styleTag);

    setAnimationName(`reveal-${text.replace(/\s+/g, "-")}`);

    return () => {
      if (styleTag.parentNode) styleTag.parentNode.removeChild(styleTag);
    };
  }, [text, random, speed, disabled]);

  return (
    <Tag
      className={`react-animated-typing-changing-text${disabled ? " disabled" : ""}`}
      style={
        {
          ...textStyle,
          position: "absolute",
          top: 0,
          left: 0,
          "--animation-name": animationName,
          "--animation-duration": `${text.length * speed}ms`,
          "--animation-delay": `${delay}ms`,
          "--initial-content": `"${random}"`,
        } as CSSProperties
      }
    />
  );
}
