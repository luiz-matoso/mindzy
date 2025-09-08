import { useEffect, useState } from "react";

function useTypewriter(text, speed = 50, enabled = true) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText("");

    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [text, speed, enabled]);

  return displayedText;
}

export default useTypewriter;
