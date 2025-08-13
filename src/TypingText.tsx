import { toUnicode } from "./helper";
import { useEffect, useState, type CSSProperties } from "react";
import "./TypingText.css";

type Props = {
  delay?: number;
  disabled?: boolean;
  speed?: number;
  tag?: keyof HTMLElementTagNameMap;
  text: string;
  textStyle?: React.CSSProperties;
};

export default function TypingText({ delay = 0, disabled, speed = 100, tag: Tag = "div", text, textStyle }: Props) {
  const [animationName, setAnimationName] = useState<string | null>(null);

  useEffect(() => {
    if (disabled) return;
    const safeName = `typing-${Math.random().toString(36).substring(2, 10)}`;
    let keyframes = `@keyframes ${safeName} {`;
    keyframes += `0% { content: "${toUnicode("_")}"; }`;
    for (let i = 0; i < text.length; i++) {
      const percent = ((i + 1) / text.length) * 100;
      const visible = text.substring(0, i + 1);
      const cursor = i !== text.length - 1 ? (i % 2 ? "" : "_") : "";
      keyframes += `${percent}% { content: "${toUnicode(`${visible}${cursor}`)}"; } `;
    }
    keyframes += `}`;

    // Inject dynamic keyframes into document
    const styleTag = document.createElement("style");
    styleTag.textContent = keyframes;
    document.head.appendChild(styleTag);
    setAnimationName(safeName);

    return () => {
      if (styleTag.parentNode) styleTag.parentNode.removeChild(styleTag);
    };
  }, [text, disabled, speed]);

  return (
    <Tag
      className="react-animated-typing-typing-text"
      style={
        {
          ...textStyle,
          position: "absolute",
          top: 0,
          left: 0,
          "--animation-name": animationName,
          "--animation-duration": `${text.length * speed}ms`,
          "--animation-delay": `${delay}ms`,
        } as CSSProperties
      }
    />
  );
}
