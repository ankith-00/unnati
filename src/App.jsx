import { useState, useEffect } from "react";

import Mobile from './Mobile/Mobile'
import Desktop from './Desktop/Desktop'

import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile View */}
      {isMobile ? (
        <Mobile />
      ) : (
        // Desktop Screen
        <Desktop />
      )}
    </>
  )
}

export default App