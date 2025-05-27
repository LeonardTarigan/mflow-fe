import { useEffect, useRef, useState } from "react";

interface FullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export default function useFullscreen() {
  const mainRef = useRef<FullscreenElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    if (mainRef.current) {
      if (mainRef.current.requestFullscreen) {
        mainRef.current.requestFullscreen();
      } else if (mainRef.current.webkitRequestFullscreen) {
        mainRef.current.webkitRequestFullscreen();
      } else if (mainRef.current.mozRequestFullScreen) {
        mainRef.current.mozRequestFullScreen();
      } else if (mainRef.current.msRequestFullscreen) {
        mainRef.current.msRequestFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return { mainRef, enterFullscreen, isFullscreen };
}
