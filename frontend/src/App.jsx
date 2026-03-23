// FILE: frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard';

// Import all page components
import FestsPage from './pages/FestsPage';
import EventsPage from './pages/EventsPage';
import ParticipantsPage from './pages/ParticipantsPage.jsx';
import TeamsPage from './pages/TeamsPage';
import VolunteersPage from './pages/VolunteersPage';
import SponsorsPage from './pages/SponsorsPage';
import JudgesPage from './pages/JudgesPage';
import EquipmentsPage from './pages/EquipmentsPage';
import ExpensesPage from './pages/ExpensesPage';
import RegistrationsPage from './pages/RegistrationsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AllocationsPage from './pages/AllocationsPage';
import SupportPage from './pages/SupportPage';
import EvaluationsPage from './pages/EvaluationsPage';
import ScoresPage from './pages/ScoresPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          {/* Main Entities */}
          <Route path="fests" element={<FestsPage />} />
          <Route path="events" element={<EventsPage />} />
          
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="teams" element={<TeamsPage />} />
          
          <Route path="volunteers" element={<VolunteersPage />} />
          <Route path="sponsors" element={<SponsorsPage />} />
          <Route path="judges" element={<JudgesPage />} />
          <Route path="equipments" element={<EquipmentsPage />} />
          <Route path="expenses" element={<ExpensesPage />} />

          {/* Relationships */}
          <Route path="registrations" element={<RegistrationsPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="allocations" element={<AllocationsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="evaluations" element={<EvaluationsPage />} />
          <Route path="scores" element={<ScoresPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;