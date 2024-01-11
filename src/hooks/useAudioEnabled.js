import { useState, useEffect } from 'react';

const useAudioEnabled = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    if (ytgame.system.isAudioEnabled()) {
        // Allow audio.
        setAudioEnabled(true)
      } else {
        // Disable audio.
        setAudioEnabled(false)
      }
  }, []);

  return audioEnabled;
};

export default useAudioEnabled;
