// FILE: frontend/src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import {
  Shield, PartyPopper, Calendar, Users, Building, Mic2, Scale, Trophy,
  ClipboardCheck, ClipboardList, Handshake, Link2, BookUser, Group, Award,
  DollarSign, Wrench
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Shield },
  { to: '/fests', label: 'Fests', icon: PartyPopper },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/participants', label: 'Participants', icon: Users },
  { to: '/teams', label: 'Teams', icon: Group },
  { to: '/volunteers', label: 'Volunteers', icon: ClipboardCheck },
  { to: '/sponsors', label: 'Sponsors', icon: Building },
  { to: '/judges', label: 'Judges', icon: Scale },
  { to: '/equipments', label: 'Equipment', icon: Mic2 },
  { to: '/expenses', label: 'Expenses', icon: DollarSign },
];

const associationItems = [
  { to: '/registrations', label: 'Registrations', icon: Trophy },
  { to: '/assignments', label: 'Assign Volunteers', icon: ClipboardList },
  { to: '/allocations', label: 'Allocate Equipment', icon: Link2 },
  { to: '/support', label: 'Sponsor Support', icon: Handshake },
  { to: '/evaluations', label: 'Assign Judges', icon: BookUser },
  { to: '/scores', label: 'Scores', icon: Award },
]

const NavItem = ({ to, label, icon: Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 rounded-lg p-3 text-sm transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-500 text-white shadow-sm shadow-blue-200' 
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
      }`
    }
  >
    {/* <Icon className={`h-4 w-4 transition-colors ${
      isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
    }`} /> */}
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 flex-shrink-0 flex-col shadow-r shadow-xl bg-white/80 backdrop-blur-sm p-5">
      {/* Enhanced Header */}
      <div className="flex items-center gap-3 px-2 mb-8 pt-2">
        {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
          <PartyPopper className="h-5 w-5 text-white" />
        </div> */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Fest DBMS
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2 pb-6">
        <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Main Entities
        </p>
        {navItems.map((item) => <NavItem key={item.to} {...item} />)}
        
        <p className="px-2 pt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Relationships
        </p>
        {associationItems.map((item) => <NavItem key={item.to} {...item} />)}
      </nav>
    </aside>
  );
};