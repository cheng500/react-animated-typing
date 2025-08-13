import { useEffect, useState } from "react";
import { toUnicode } from "./helper";

type Props = {
  delay?: number;
  disabled?: boolean;
  speed?: number;
  tag?: keyof HTMLElementTagNameMap;
  text: string;
  textStyle?: React.CSSProperties;
};

export default function TypingText({ delay = 0, disabled, speed = 100, tag: Tag = "div", text, textStyle }: Props) {
  const [className, setClassName] = useState<string>("");

  useEffect(() => {
    if (disabled || !text) return;

    const name = `typing-${Math.random().toString(36).substring(2, 10)}`;
    let keyframes = `@keyframes ${name} {`;
    keyframes += `0% { content: "${toUnicode("_")}"; }`;

    for (let i = 0; i < text.length; i++) {
      const percent = ((i + 1) / text.length) * 100;
      const visible = text.substring(0, i + 1);
      const cursor = i !== text.length - 1 ? (i % 2 ? "" : "_") : "";
      keyframes += `${percent}% { content: "${toUnicode(`${visible}${cursor}`)}"; } `;
    }

    keyframes += `100% { content: "${toUnicode(text)}"; } }`;

    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .${name}::before {
        content: "";
        display: inline-block;
        animation: ${name} ${text.length * speed}ms linear forwards;
        animation-delay: ${delay}ms;
      }
      ${keyframes}
    `;
    document.head.appendChild(styleTag);

    setClassName(name);

    return () => {
      if (styleTag.parentNode) styleTag.parentNode.removeChild(styleTag);
    };
  }, [text, speed, delay, disabled]);

  return (
    <Tag
      className={className}
      style={{
        ...textStyle,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
}
