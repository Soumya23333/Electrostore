import React, { useEffect, useState } from "react";
import "../index.css"; // or your CSS file

const IntroAnimation = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500); // 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro && (
        <div className="intro-screen">
          <h1 className="intro-logo">Electrostore</h1>
        </div>
      )}
    </>
  );
};

export default IntroAnimation;
