import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BrainCircuit,
  MessageSquareText,
  BarChart3,
  Settings,
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/predictions', label: 'Predictions', icon: Sparkles },
  { path: '/ml-models', label: 'ML Models', icon: BrainCircuit },
  { path: '/nlp', label: 'NLP Analysis', icon: MessageSquareText },
  { path: '/admin', label: 'Admin Panel', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, onCollapseChange }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-[#0f1117] border-r border-[#1e2130] transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-[#1e2130]">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-base font-semibold text-white tracking-tight">CinePredict</span>
            </div>
          )}
          {collapsed && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 mx-auto">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => onCollapseChange(true)}
              className="p-1.5 rounded-md text-[#6b7280] hover:text-white hover:bg-[#1e2130] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            onClick={() => onCollapseChange(false)}
            className="absolute right-[-12px] top-20 p-1 rounded-full bg-[#1e2130] border border-[#2a2d3e] text-[#6b7280] hover:text-white transition-colors"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        )}

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400'
                    : 'text-[#9ca3af] hover:bg-[#1e2130] hover:text-white'
                }`}
              >
                <Icon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#1e2130]">
          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#9ca3af] hover:bg-[#1e2130] hover:text-white transition-all duration-200"
          >
            <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
