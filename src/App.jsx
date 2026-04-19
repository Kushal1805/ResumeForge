import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeContextProvider } from './context/ResumeContext';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ResumeContextProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/builder/:resumeId" 
              element={
                <ProtectedRoute>
                  <BuilderPage />
                </ProtectedRoute>
              } 
            />
            {/* Fallback for old /builder route */}
            <Route path="/builder" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ResumeContextProvider>
      </AuthProvider>
    </HashRouter>
  );
}
