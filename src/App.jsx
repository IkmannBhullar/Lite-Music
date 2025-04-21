import './App.css';
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MusicCard from "./components/MusicCard";
import NowPlayingBar from './components/NowPlayingBar';
import GenreBar from "./components/GenreBar";
import TrendingCarousel from "./components/TrendingCarousel";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    if (isCurrentlyDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setTracks(data.data || []);
    } catch (err) {
      console.error("Deezer search error:", err);
    }
  };

  const handleTrackClick = (track, index) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
      const nextIndex = currentTrackIndex + 1;
      setCurrentTrack(tracks[nextIndex]);
      setCurrentTrackIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const playPrev = () => {
    if (currentTrackIndex > 0) {
      const prevIndex = currentTrackIndex - 1;
      setCurrentTrack(tracks[prevIndex]);
      setCurrentTrackIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full bg-brand-background text-brand-text dark:bg-brand-dark-background dark:text-brand-dark-text">
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col h-full">
          <Header toggleTheme={toggleTheme} isDark={isDark} />
          <GenreBar onGenreSelect={handleSearch} />
          <TrendingCarousel
            onClickTrack={(track) => {
              const index = tracks.findIndex((t) => t.id === track.id);
              setCurrentTrack(track);
              setCurrentTrackIndex(index);
              setIsPlaying(true);
            }}
          />
          <SearchBar onSearch={handleSearch} />

          {/* Scrollable themed results section */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-32">
            <div className="bg-brand-surface dark:bg-brand-dark-surface p-4 rounded-lg transition-colors">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {tracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <MusicCard
                        title={track.title}
                        artist={track.artist.name}
                        image={track.album.cover_medium}
                        onClick={() => handleTrackClick(track, index)}
                        isActive={currentTrack?.id === track.id}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <NowPlayingBar
            track={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onNext={playNext}
            onPrev={playPrev}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
