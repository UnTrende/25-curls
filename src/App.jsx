import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedGradient from './components/AnimatedGradient';
import HeroSection from './components/HeroSection';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Accessibility from './pages/Accessibility';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageBookings from './pages/admin/ManageBookings';
import ManageServices from './pages/admin/ManageServices';
import ManageMessages from './pages/admin/ManageMessages';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManagePortfolio from './pages/admin/ManagePortfolio';
import ManageSettings from './pages/admin/ManageSettings';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth.jsx';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className="min-h-screen text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
        <AnimatedGradient />
        {!isAdminRoute && <Navbar />}

        <main className={!isAdminRoute ? "pt-[var(--total-header-height)]" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute>
                <ManageBookings />
              </ProtectedRoute>
            } />
            <Route path="/admin/services" element={
              <ProtectedRoute>
                <ManageServices />
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <ManageMessages />
              </ProtectedRoute>
            } />
            <Route path="/admin/testimonials" element={
              <ProtectedRoute>
                <ManageTestimonials />
              </ProtectedRoute>
            } />
            <Route path="/admin/portfolio" element={
              <ProtectedRoute>
                <ManagePortfolio />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <ManageSettings />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;