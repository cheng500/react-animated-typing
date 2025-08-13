import { useEffect, useState } from "react";
import { toUnicode } from "./helper";

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
  const [className, setClassName] = useState<string>("");

  useEffect(() => {
    const name = `changing-${Math.random().toString(36).substring(2, 10)}`;
    const duration = text.length * speed;

    // Build keyframes only if not disabled
    let keyframes = "";
    if (!disabled && text && random) {
      keyframes += `@keyframes ${name} {`;
      keyframes += `0% { content: "${toUnicode(random)}"; }`;
      for (let i = 0; i < text.length; i++) {
        const percent = ((i + 1) / text.length) * 100;
        const visible = text.substring(0, i + 1);
        const remainingRandom = random.substring(i + 1);
        keyframes += `${percent}% { content: "${toUnicode(visible + remainingRandom)}"; } `;
      }
      keyframes += `100% { content: "${toUnicode(text)}"; } }`;
    }

    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .${name}::before {
        content: "${toUnicode(random)}"; /* always show initial random */
        display: inline-block;
        ${!disabled ? `animation: ${name} ${duration}ms linear forwards; animation-delay: ${delay}ms;` : ""}
      }
      ${keyframes}
    `;
    document.head.appendChild(styleTag);

    setClassName(name);

    return () => {
      if (styleTag.parentNode) styleTag.parentNode.removeChild(styleTag);
    };
  }, [text, random, speed, delay, disabled]);

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
