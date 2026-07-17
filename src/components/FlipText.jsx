import React, { useMemo, useEffect } from "react";
import { cn } from "../lib/utils";

// Inject keyframe styles once
const STYLE_ID = "flip-text-keyframes";
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes flipIn {
      0%   { transform: rotateX(-90deg); opacity: 0; }
      60%  { transform: rotateX(10deg);  opacity: 1; }
      80%  { transform: rotateX(-5deg);  opacity: 1; }
      100% { transform: rotateX(0deg);   opacity: 1; }
    }

    .flip-char {
      animation: flipIn var(--flip-duration, 2.2s)
                 ease-in-out
                 var(--flip-delay, 0s)
                 var(--flip-iteration, infinite)
                 both;
      display: inline-block;
      backface-visibility: hidden;
    }
  `;
  document.head.appendChild(style);
}

export function FlipText({
  className,
  children,
  duration = 2.2,
  delay = 0,
  loop = true,
  separator = " ",
  together = false,
}) {
  useEffect(() => {
    injectStyles();
  }, []);

  const words = useMemo(() => children.split(separator), [children, separator]);
  const totalChars = children.length;

  const getCharIndex = (wordIndex, charIndex) => {
    let index = 0;
    for (let i = 0; i < wordIndex; i++) {
      index += words[i].length + (separator === " " ? 1 : separator.length);
    }
    return index + charIndex;
  };

  return (
    <div
      className={cn("flip-text-wrapper inline-block leading-none", className)}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wordIndex) => {
        const chars = word.split("");

        return (
          <span
            key={wordIndex}
            className="word inline-block whitespace-nowrap"
            style={{ transformStyle: "preserve-3d" }}
          >
            {chars.map((char, charIndex) => {
              const currentGlobalIndex = getCharIndex(wordIndex, charIndex);

              let calculatedDelay = delay;
              if (!together) {
                const normalizedIndex = currentGlobalIndex / totalChars;
                const sineValue = Math.sin(normalizedIndex * (Math.PI / 2));
                calculatedDelay = sineValue * (duration * 0.25) + delay;
              }

              return (
                <span
                  key={charIndex}
                  className="flip-char"
                  data-char={char}
                  style={{
                    "--flip-duration": `${duration}s`,
                    "--flip-delay": `${calculatedDelay}s`,
                    "--flip-iteration": loop ? "infinite" : "1",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {char}
                </span>
              );
            })}
            {separator === " " && wordIndex < words.length - 1 && (
              <span className="whitespace inline-block">&nbsp;</span>
            )}
            {separator !== " " && wordIndex < words.length - 1 && (
              <span className="separator inline-block">{separator}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default FlipText;
