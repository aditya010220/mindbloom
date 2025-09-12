import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import WelcomeMessage from './components/WelcomeMessage';
import AuthLinks from './components/AuthLinks';
import FloatingLeaves from './components/FloatingLeaves';

const StudentLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole === 'student') {
      navigate('/student-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <Header isAuthenticated={false} />
      {/* Floating background elements */}
      <FloatingLeaves />
      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <div className="glass-card rounded-2xl p-8 sm:p-10 shadow-prominent gentle-transition hover:shadow-lg">
            {/* Welcome Message */}
            <WelcomeMessage />
            
            {/* Login Form */}
            <LoginForm />
            
            {/* Auth Links */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <AuthLinks />
            </div>
          </div>
          
          {/* Footer Information */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By signing in, you agree to our Terms of Service and Privacy Policy.
              <br />
              Your mental health journey is private and secure.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>All systems operational</span>
              </div>
              <div className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} MindBloom
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentLogin;