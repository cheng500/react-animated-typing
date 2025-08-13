import { useEffect, useMemo, useState } from "react";
import ChangingText from "./ChangingText";
import TypingText from "./TypingText";

type Props = {
  delay?: number;
  disabled?: boolean;
  speed?: number;
  tag?: keyof HTMLElementTagNameMap;
  text: string;
  type?: "typing" | "random";
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
};

const availableCharacters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!/\\%$<E2><82><AC>&()=?+.,;:_<>#[]";

export default function AnimatedText({
  delay = 0,
  disabled,
  speed = 100,
  tag: Tag = "div",
  text,
  type,
  style,
  textStyle,
  ...props
}: Props) {
  const [isComplete, setIsComplete] = useState(false);

  const random = useMemo(() => {
    let res = "";
    if (type == "random") {
      for (let i = 0; i < text.length; i++) {
        res += availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
      }
    }
    return res;
  }, [text, type]);

  useEffect(() => {
    setIsComplete(false);
    if (disabled) return;
    const timeout = setTimeout(() => setIsComplete(true), speed * text.length + delay);

    return () => clearTimeout(timeout);
  }, [text, disabled, delay, speed]);

  return (
    <div style={{ ...style, position: "relative" }}>
      <Tag style={{ ...textStyle, visibility: isComplete ? "visible" : "hidden", opacity: 0.1 }}>{text}</Tag>
      {type == "random" ? (
        <ChangingText
          delay={delay}
          disabled={disabled}
          random={random}
          speed={speed}
          tag={Tag}
          text={text}
          textStyle={textStyle}
          {...props}
        />
      ) : (
        <TypingText
          delay={delay}
          disabled={disabled}
          speed={speed}
          tag={Tag}
          text={text}
          textStyle={textStyle}
          {...props}
        />
      )}
    </div>
  );
}
