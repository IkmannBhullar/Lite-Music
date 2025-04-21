import {
  Home,
  Search,
  Library,
  ListMusic,
  PlayCircle,
} from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "Search", icon: <Search size={18} /> },
    { name: "Library", icon: <Library size={18} /> },
  ];

  const playlists = [
    { id: 1, title: "Lo-Fi Chill 🌙", icon: <PlayCircle size={18} /> },
    { id: 2, title: "Top Hits 🔥", icon: <PlayCircle size={18} /> },
    { id: 3, title: "Focus Flow 🎧", icon: <PlayCircle size={18} /> },
    { id: 4, title: "Throwback Mix 💾", icon: <PlayCircle size={18} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col bg-brand-background text-brand-text dark:bg-brand-dark-background dark:text-brand-dark-text w-60 h-screen p-6 border-r border-zinc-800 dark:border-zinc-700">
      <div className="flex items-center gap-2 text-2xl font-bold mb-10 tracking-tight">
        <ListMusic size={26} className="text-brand-primary dark:text-brand-dark-primary" />
        LiteMusic
      </div>

      <nav>
        <ul className="space-y-4 text-base font-medium mb-8">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 transition cursor-pointer relative px-2 py-1 rounded-md ${
                active === item.name
                  ? "text-brand-accent bg-brand-surface dark:bg-brand-dark-surface"
                  : "hover:text-brand-accent dark:hover:text-brand-dark-accent"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {active === item.name && (
                <span className="absolute left-0 h-full w-[4px] bg-brand-accent rounded-full animate-slide-in" />
              )}
            </li>
          ))}
        </ul>

        <h3 className="text-sm text-brand-muted dark:text-brand-dark-muted mb-2">Your Playlists</h3>
        <ul className="space-y-3 text-sm font-normal overflow-y-auto max-h-60 pr-1">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className="flex items-center gap-2 text-brand-muted hover:text-brand-text dark:text-brand-dark-muted dark:hover:text-brand-dark-text transition cursor-pointer"
            >
              {playlist.icon}
              {playlist.title}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
