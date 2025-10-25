
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MyMedications from './pages/MyMedications';
import MyWeightTracker from './pages/MyWeightTracker';
import HealthUniversity from './pages/HealthUniversity';
import MealPlanner from './pages/MealPlanner';
import SocialFeed from './pages/SocialFeed';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="medications" element={<MyMedications />} />
          <Route path="tracker" element={<MyWeightTracker />} />
          <Route path="university" element={<HealthUniversity />} />
          <Route path="planner" element={<MealPlanner />} />
          <Route path="social" element={<SocialFeed />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
