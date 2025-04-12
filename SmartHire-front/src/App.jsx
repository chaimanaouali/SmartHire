import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import LoginPage from './components/Auth/LoginPage';
import ProfilePage from './components/Profile/ProfilePage';
import AuthPage from './components/Auth/AuthPage';
import EditProfile from './components/Profile/EditProfile';
import UpdatePassword from './components/Profile/UpdatePassword';
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import {Dashboard} from "./components/dashboard/dashboard";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Dashboard route (without navigation) */}
          <Route 
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* All other protected routes with navigation */}
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <DefaultLayout>
                  <ProfilePage />
                </DefaultLayout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/edit-profile" 
            element={
              <PrivateRoute>
                <DefaultLayout>
                  <EditProfile />
                </DefaultLayout>
              </PrivateRoute>
            } 
          />
          <Route
            path="/update-password" 
            element={
              <PrivateRoute>
                <DefaultLayout>
                  <UpdatePassword />
                </DefaultLayout>
              </PrivateRoute>
            } 
          />

          {/* Home route with navigation */}
          <Route 
            path="/" 
            element={
              <DefaultLayout>
                <Header data={landingPageData.Header} />
                <Features data={landingPageData.Features} />
                <About data={landingPageData.About} />
                <Services data={landingPageData.Services} />
                <Gallery data={landingPageData.Gallery} />
                <Testimonials data={landingPageData.Testimonials} />
                <Team data={landingPageData.Team} />
                <Contact data={landingPageData.Contact} />
              </DefaultLayout>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;