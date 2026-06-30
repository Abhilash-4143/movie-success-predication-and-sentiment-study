import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

interface TopNavProps {
  sidebarCollapsed: boolean;
}

export default function TopNav({ sidebarCollapsed }: TopNavProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-[#0f1117]/95 backdrop-blur-sm border-b border-[#1e2130] transition-all duration-300 ${
        sidebarCollapsed ? 'left-[72px]' : 'left-[260px]'
      }`}
    >
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className={`relative transition-all duration-300 ${searchOpen ? 'w-80' : 'w-64'}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search movies, predictions, reports..."
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              className="w-full rounded-xl bg-[#1e2130] border border-[#2a2d3e] pl-9 pr-4 py-2 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative p-2 rounded-xl text-[#9ca3af] hover:text-white hover:bg-[#1e2130] transition-colors"
          >
            {darkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <button className="relative p-2 rounded-xl text-[#9ca3af] hover:text-white hover:bg-[#1e2130] transition-colors">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3 ml-2 pl-3 border-l border-[#1e2130]">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <span className="text-xs font-semibold text-white">JD</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-[#6b7280]">Data Scientist</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
