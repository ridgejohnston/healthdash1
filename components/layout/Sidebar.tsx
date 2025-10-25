
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../constants';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/medications', label: 'My Medications', icon: 'medications' },
  { path: '/tracker', label: 'Weight Tracker', icon: 'tracker' },
  { path: '/university', label: 'Health University', icon: 'university' },
  { path: '/planner', label: 'Meal Planner', icon: 'planner' },
  { path: '/social', label: 'Social', icon: 'social' },
];

const NavItem: React.FC<{ path: string; label: string; icon: string }> = ({ path, label, icon }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-sky-500 text-white'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`
    }
  >
    <span className="mr-3 w-6 h-6">{ICONS[icon]}</span>
    {label}
  </NavLink>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center mr-3">
            <span className="font-bold text-white text-xl">H</span>
          </div>
          <h1 className="text-xl font-bold text-white">HealthDash</h1>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>
      </div>
      <div className="mt-auto">
        <div className="flex items-center p-2 rounded-lg hover:bg-slate-700 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center mr-3">
            {ICONS.user}
          </div>
          <div>
            <p className="font-semibold text-white">Jane Doe</p>
            <p className="text-xs text-slate-400">View Profile</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
