import React, { createContext, useContext, useRef, useState } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startAudio = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        audioRef.current.volume = 0.7;
        await audioRef.current.play();
        setIsPlaying(true);
        console.log("Audio started playing");
      } catch (error) {
        console.log("Audio play failed:", error);
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ startAudio, stopAudio, isPlaying }}>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/assets/SuspenseMusic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};