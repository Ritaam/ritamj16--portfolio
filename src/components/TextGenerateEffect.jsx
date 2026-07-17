import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';

/**
 * TextGenerateEffect
 * Reveals words one-by-one with a blur-to-clear animation.
 *
 * Props:
 *   words      – string   The sentence/phrase to animate
 *   className  – string   Extra class for the outer wrapper
 *   filter     – boolean  Enable blur effect (default: true)
 *   duration   – number   Per-word animation duration in seconds (default: 0.5)
 *   delay      – number   Stagger delay between words in seconds (default: 0.15)
 *   once       – boolean  Animate only once on mount (default: true)
 */
export function TextGenerateEffect({
  words,
  className = '',
  filter = true,
  duration = 0.5,
  delay = 0.15,
}) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');

  useEffect(() => {
    animate(
      'span.tge-word',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration,
        delay: stagger(delay),
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current]);

  return (
    <div className={`tge-wrapper ${className}`}>
      <motion.div ref={scope} className="tge-inner">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="tge-word"
            style={{
              opacity: 0,
              filter: filter ? 'blur(10px)' : 'none',
              display: 'inline-block',
              marginRight: '0.28em',
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default TextGenerateEffect;
