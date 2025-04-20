function Sidebar() {
    return (
      <div className="bg-brand-background text-brand-text w-60 h-screen p-5">
        <h1 className="text-2xl font-bold mb-8">🎵 LiteMusic</h1>
        <ul className="space-y-4 text-lg">
          <li className="hover:text-brand-accent cursor-pointer">Home</li>
          <li className="hover:text-brand-accent cursor-pointer">Search</li>
          <li className="hover:text-brand-accent cursor-pointer">Library</li>
        </ul>
      </div>
    );
  }
  
  export default Sidebar;
  