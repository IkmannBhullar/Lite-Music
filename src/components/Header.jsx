import { Sun, Moon } from "lucide-react";

function Header({ toggleTheme, isDark }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-brand-background text-brand-text dark:bg-brand-dark-background dark:text-brand-dark-text">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-brand-surface dark:hover:bg-brand-dark-surface transition"
        title="Toggle Theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-500" />
        )}
      </button>
    </header>
  );
}

export default Header;
