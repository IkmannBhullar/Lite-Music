import { useState } from "react";

const genres = [
  "Lo-fi",
  "Hip-Hop",
  "Pop",
  "Jazz",
  "Electronic",
  "Rock",
  "Classical",
  "R&B",
];

function GenreBar({ onGenreSelect }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (genre) => {
    setSelected(genre);
    onGenreSelect(genre);
  };

  return (
    <div className="overflow-x-auto scroll-smooth px-6 py-2">
 
      <div className="flex gap-3 w-max">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleClick(genre)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition 
              ${
                selected === genre
                  ? "bg-brand-primary text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-brand-accent"
              }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreBar;
