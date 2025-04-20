function Header() {
    return (
      <div className="bg-brand-surface text-brand-text p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Welcome back 👋</h2>
        <button className="bg-brand-primary hover:bg-brand-accent px-4 py-1 rounded transition">
          Login
        </button>
      </div>
    );
  }
  
  export default Header;