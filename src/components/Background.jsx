import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to auto-play on first load
    audioRef.current.play().catch((e) => {
      console.log("Auto-play prevented:", e);
    });
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/Arthur-s-Birthday/Unshaken.mp3" // Change to your file name
      loop
      autoPlay // Supported in some browsers, but JS may be needed for auto-start
      style={{ display: "none" }}
    />
  );
}
