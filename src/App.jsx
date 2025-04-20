import './App.css';
import { useState } from "react";
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-brand-background min-h-screen pb-24 w-full max-w-full">
        <Header />
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6">
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

        <NowPlayingBar
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onNext={playNext}
          onPrev={playPrev}
        />
      </div>
    </div>
  );
}

export default App;
