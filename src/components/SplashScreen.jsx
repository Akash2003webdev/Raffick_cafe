import { useEffect, useRef, useState } from "react";

// Set fallback timer to 6 seconds (6000ms)
const DISPLAY_MS = 6000; 

export default function SplashScreen({ onFinish }) {
  const [fadingOut, setFadingOut] = useState(false);
  const timerRef = useRef(null);
  const finishedRef = useRef(false);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFadingOut(true);
    setTimeout(() => onFinish?.(), 400); // matches fade-out transition duration
  }

  useEffect(() => {
    // This acts as a fallback just in case the video fails to load or play
    timerRef.current = setTimeout(finish, DISPLAY_MS);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={finish} // Allows user to tap to skip the video
      className={`fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-400 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        autoPlay
        muted // Muted is REQUIRED for autoplay to work on mobile browsers (like Safari/Chrome)
        playsInline // REQUIRED for iOS so it doesn't open in fullscreen player automatically
        onEnded={finish} // Automatically triggers the fade-out exactly when the video ends
        onError={finish} // No splash video file present yet — skip straight to the app
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Mobile Video: Plays on screens up to 768px wide directly from public folder */}
        <source src="/public/splash-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
        
        {/* Desktop Video: Plays on screens 769px and wider directly from public folder */}
        <source src="/public/splash.mp4" media="(min-width: 769px)" type="video/mp4" />
        
        {/* Fallback text if browser doesn't support video */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}