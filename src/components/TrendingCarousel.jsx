import { useEffect, useState } from "react";

function TrendingCarousel({ onClickTrack }) {
  const [tracks, setTracks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const scrollDelay = 3000;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `https://corsproxy.io/?https://api.deezer.com/search?q=lofi`
        );
        const data = await res.json();
        setTracks(data.data || []);
      } catch (err) {
        console.error("Trending fetch error:", err);
      }
    };

    fetchTrending();
  }, []);

  // 🔁 Auto-change page every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) =>
        (prevPage + 1) * itemsPerPage >= tracks.length ? 0 : prevPage + 1
      );
    }, scrollDelay);

    return () => clearInterval(interval);
  }, [tracks]);

  const startIndex = currentPage * itemsPerPage;
  const visibleTracks = tracks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full px-4 md:px-8 py-4 overflow-hidden">
      <h2 className="text-xl font-semibold text-brand-text mb-2">
        🔥 Trending Now
      </h2>
      <div className="flex gap-4 justify-center transition-all duration-500 ease-in-out">
        {visibleTracks.map((track) => (
          <div
            key={track.id}
            className="w-32 flex-shrink-0 cursor-pointer"
            onClick={() => onClickTrack(track)}
          >
            <img
              src={track.album.cover_medium}
              alt={track.title}
              className="w-full h-32 object-cover rounded mb-1 hover:scale-105 transition"
            />
            <p className="text-xs text-brand-text truncate">{track.title}</p>
            <p className="text-xs text-brand-muted truncate">{track.artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingCarousel;
