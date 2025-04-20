import { motion } from "framer-motion";

function MusicCard({ title, artist, image, onClick, isActive }) {
  return (
    <motion.div
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative bg-brand-surface p-4 rounded-lg text-brand-text w-44 transition cursor-pointer duration-200 ease-in-out
        ${
          isActive
            ? "ring-2 ring-brand-primary scale-105 shadow-lg"
            : "hover:bg-brand-accent/30 hover:shadow-xl hover:-translate-y-1"
        }`}
    >
      <div className="relative w-full h-44 mb-3 rounded overflow-hidden">
        {isActive && (
          <div className="absolute inset-0 z-0 rounded bg-brand-primary opacity-30 blur-xl animate-pulse-glow"></div>
        )}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover rounded relative z-10 transition duration-300 ${
            isActive ? "" : "hover:scale-105 hover:brightness-110"
          }`}
        />
        {isActive && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="flex gap-[2px] items-end h-6">
              <div className="w-[3px] h-full bg-brand-primary animate-bar1"></div>
              <div className="w-[3px] h-4 bg-brand-primary animate-bar2"></div>
              <div className="w-[3px] h-5 bg-brand-primary animate-bar3"></div>
              <div className="w-[3px] h-3 bg-brand-primary animate-bar1"></div>
              <div className="w-[3px] h-6 bg-brand-primary animate-bar2"></div>
            </div>
          </div>
        )}
      </div>
      <h3 className="font-semibold truncate">{title}</h3>
      <p className="text-sm text-brand-muted truncate">{artist}</p>
    </motion.div>
  );
}

export default MusicCard;
