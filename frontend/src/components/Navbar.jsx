import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition">
            🎉 Fest DBMS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-gray-200 transition font-medium">Dashboard</Link>
            
            <div className="relative group">
              <button className="text-white hover:text-gray-200 transition font-medium">
                Entities ▼
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-50">
                <Link to="/fests" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Fests</Link>
                <Link to="/events" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Events</Link>
                <Link to="/participants" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Participants</Link>
                <Link to="/teams" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Teams</Link>
                <Link to="/volunteers" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Volunteers</Link>
                <Link to="/sponsors" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Sponsors</Link>
                <Link to="/expenses" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Expenses</Link>
                <Link to="/equipments" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Equipments</Link>
                <Link to="/judges" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Judges</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-gray-200 transition font-medium">
                Relations ▼
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-50">
                <Link to="/allocated" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Allocated</Link>
                <Link to="/assign" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Assign</Link>
                <Link to="/support" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Support</Link>
                <Link to="/evaluate" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Evaluate</Link>
                <Link to="/scores" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Scores</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-gray-200 transition font-medium">
                Transactions ▼
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-56 z-50">
                <Link to="/register/team" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Team Registration</Link>
                <Link to="/register/participant" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Participant Registration</Link>
              </div>
            </div>

            <Link to="/reports" className="text-white hover:text-gray-200 transition font-medium">📊 Reports</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-white hover:text-gray-200">Dashboard</Link>
            <Link to="/fests" className="block py-2 text-white hover:text-gray-200">Fests</Link>
            <Link to="/events" className="block py-2 text-white hover:text-gray-200">Events</Link>
            <Link to="/participants" className="block py-2 text-white hover:text-gray-200">Participants</Link>
            <Link to="/teams" className="block py-2 text-white hover:text-gray-200">Teams</Link>
            <Link to="/register/team" className="block py-2 text-white hover:text-gray-200">Team Register</Link>
            <Link to="/register/participant" className="block py-2 text-white hover:text-gray-200">Participant Register</Link>
            <Link to="/reports" className="block py-2 text-white hover:text-gray-200">Reports</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
