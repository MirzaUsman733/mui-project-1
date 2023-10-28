import React, { useState, useEffect } from 'react';

const TypingComponent = ({ strings, speed = 1000, delay = 10000 }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentText = strings[index];
      if (text !== currentText) {
        setText((prevText) => {
          const diff = currentText.length - prevText.length;
          const newText =
            diff > 0 ? currentText.substring(0, prevText.length + 1) : prevText;
          return newText;
        });
      } else {
        // If reached the end of the current string, reset the state to start over
        setText('');
        setIndex((prevIndex) => (prevIndex + 1) % strings.length); // Move to the next string or loop back to the beginning
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, index, strings, speed]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Move to the next string after the delay
      setIndex((prevIndex) => (prevIndex + 1) % strings.length); // Move to the next string or loop back to the beginning
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [index, delay, strings.length]);

  return <span className='ketonicHeaderTxt'>{text}</span>;
};

export default TypingComponent;
