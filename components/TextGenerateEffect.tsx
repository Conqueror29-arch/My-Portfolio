
import React, { useEffect, useState } from 'react';

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  delay?: number;
}

const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({ words, className = "", delay = 0 }) => {
  const [isStarted, setIsStarted] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={className}>
      <div className="leading-snug tracking-wide">
        {wordsArray.map((word, idx) => (
          <span
            key={idx}
            className={`inline-block mr-1.5 transition-all duration-700 ease-in-out`}
            style={{
                opacity: isStarted ? 1 : 0,
                transform: isStarted ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
                filter: isStarted ? 'blur(0px)' : 'blur(4px)',
                transitionDelay: `${idx * 0.1}s`
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextGenerateEffect;
