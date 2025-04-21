function MusicCard({ title, artist, image, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-lg p-4 w-44 transition
        bg-brand-surface text-brand-text hover:bg-brand-accent/30
        dark:bg-brand-dark-surface dark:text-brand-dark-text dark:hover:bg-brand-dark-accent/30
        ${isActive ? "ring-2 ring-brand-primary dark:ring-brand-dark-primary scale-105 shadow-lg" : ""}
      `}
    >
      {/* Album Art */}
      <div className="relative w-full h-44 mb-3 rounded overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded"
        />

        {/* Active Music Bars */}
        {isActive && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex gap-[2px] items-end h-6">
              <div className="w-[3px] h-full animate-bar1 bg-brand-primary dark:bg-brand-dark-primary"></div>
              <div className="w-[3px] h-4 animate-bar2 bg-brand-primary dark:bg-brand-dark-primary"></div>
              <div className="w-[3px] h-5 animate-bar3 bg-brand-primary dark:bg-brand-dark-primary"></div>
              <div className="w-[3px] h-3 animate-bar1 bg-brand-primary dark:bg-brand-dark-primary"></div>
              <div className="w-[3px] h-6 animate-bar2 bg-brand-primary dark:bg-brand-dark-primary"></div>
            </div>
          </div>
        )}
      </div>

      {/* Track Info */}
      <h3 className="font-semibold truncate">{title}</h3>
      <p className="text-sm truncate text-brand-muted dark:text-brand-dark-muted">{artist}</p>
    </div>
  );
}

export default MusicCard;
