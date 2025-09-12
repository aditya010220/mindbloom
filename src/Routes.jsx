import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AIChatbotSupport from './pages/ai-chatbot-support';
import CounselorDashboard from './pages/counselor-dashboard';
import StudentLogin from './pages/student-login';
import AppointmentBooking from './pages/appointment-booking';
import AdminAnalyticsDashboard from './pages/admin-analytics-dashboard';
import StudentDashboard from './pages/student-dashboard';
import AdminLogin from './pages/admin-login';
import CounselorLogin from './pages/counselor-login';
import RegisterPage from './pages/register';
import CounselorSessions from './pages/counselor-sessions';
import CounselorSchedule from './pages/counselor-schedule';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminAnalyticsDashboard />} />
        <Route path="/ai-chatbot-support" element={<AIChatbotSupport />} />
        <Route path="/counselor-dashboard" element={<CounselorDashboard />} />
        <Route path="/counselor-sessions" element={<CounselorSessions />} />
        <Route path="/counselor-schedule" element={<CounselorSchedule />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/counselor-login" element={<CounselorLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/admin-analytics-dashboard" element={<AdminAnalyticsDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
