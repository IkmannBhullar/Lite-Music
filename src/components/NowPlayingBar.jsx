import { useEffect, useRef, useState } from "react";

function NowPlayingBar({ track, isPlaying, onTogglePlay, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Deezer previews are 30s
  const [volume, setVolume] = useState(1);

  // Setup playback when track or play state changes
  useEffect(() => {
    if (audioRef.current && track?.preview) {
      audioRef.current.pause();
      audioRef.current.src = track.preview;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [track, isPlaying]);

  // Sync current time while playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 30);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Seek in audio
  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" + sec : sec}`;
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 text-white px-4 py-3 border-t border-zinc-800 z-50 animate-slide-up">
      {/* Top Row: Info + Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Info */}
        <div className="flex items-center gap-4 overflow-hidden">
          <img
            src={track.album.cover_small}
            alt={track.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="truncate">
            <h4 className="text-sm font-medium truncate">{track.title}</h4>
            <p className="text-xs text-zinc-400 truncate">{track.artist.name}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="text-white hover:text-brand-accent text-xl"
          >
            ⏮️
          </button>
          <button
            onClick={onTogglePlay}
            className="bg-brand-primary hover:bg-brand-accent text-white px-4 py-1 rounded-full text-sm font-medium"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button
            onClick={onNext}
            className="text-white hover:text-brand-accent text-xl"
          >
            ⏭️
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-32">
          <span className="text-xs text-zinc-400">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Bottom Row: Progress Bar */}
      <div className="flex items-center gap-3 mt-2">
        <span className="text-xs text-zinc-400">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="flex-1"
        />
        <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default NowPlayingBar;
