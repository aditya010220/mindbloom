import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', isAuthenticated = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef?.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      { 
        label: 'Dashboard', 
        path: userRole === 'student' ? '/student-dashboard' : 
              userRole === 'counselor'? '/counselor-dashboard' : '/admin-analytics-dashboard',
        icon: 'LayoutDashboard'
      }
    ];

    if (userRole === 'student') {
      return [
        ...baseItems,
        { label: 'AI Support', path: '/ai-chatbot-support', icon: 'MessageCircle' },
        { label: 'Book Session', path: '/appointment-booking', icon: 'Calendar' }
      ];
    }

    if (userRole === 'counselor') {
      return [
        ...baseItems,
        { label: 'Sessions', path: '/counselor-sessions', icon: 'Users' },
        { label: 'Schedule', path: '/counselor-schedule', icon: 'Calendar' }
      ];
    }

    if (userRole === 'admin') {
      return [
        ...baseItems,
        // { label: 'Analytics', path: '/admin-analytics-dashboard', icon: 'BarChart3' },
        // { label: '', path: '/admin-users', icon: '' }
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCrisisSupport = () => {
    setShowCrisisSupport(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
    } finally {
      setIsProfileMenuOpen(false);
      const loginPaths = {
        student: '/student-login',
        counselor: '/counselor-login',
        admin: '/admin-login'
      };
      navigate(loginPaths[userRole] || '/student-login', { replace: true });
      setIsMobileMenuOpen(false);
    }
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          className="text-primary"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            fill="currentColor" 
            fillOpacity="0.1"
          />
          <path 
            d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.2-0.9 4.2-2.3 5.7l-2.8-2.8c0.7-0.6 1.1-1.5 1.1-2.9 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.4 0.4 2.3 1.1 2.9l-2.8 2.8C12.9 24.2 12 22.2 12 20z" 
            fill="currentColor"
          />
          <circle cx="20" cy="20" r="2" fill="currentColor"/>
          <path 
            d="M15 28c1.5 1.5 3.5 2 5 2s3.5-0.5 5-2" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-semibold text-foreground">
          MindBloom
        </h1>
        <p className="text-xs font-caption text-muted-foreground">
          Mental Wellness Platform
        </p>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <header className="fixed top-0 left-0 right-0 z-100 bg-background/80 backdrop-blur-therapeutic border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <Button 
              variant="ghost" 
              onClick={() => navigate('/student-login')}
              iconName="LogIn"
              iconPosition="right"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-100 bg-background/80 backdrop-blur-therapeutic border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Button
                  key={`${item?.path}-${item?.label}`}
                  variant={location?.pathname === item?.path ? "secondary" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  className="gentle-transition"
                >
                  {item?.label}
                </Button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCrisisSupport}
                iconName="Heart"
                iconPosition="left"
                className="text-error border-error/20 hover:bg-error/10"
              >
                Crisis Support
              </Button>
              
              <div className="flex items-center space-x-2 pl-4 border-l border-border">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {userRole} Portal
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Welcome back
                  </p>
                </div>
                <div className="relative" ref={profileMenuRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="User"
                    className="rounded-full"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  />
                  {isProfileMenuOpen && (userRole === 'admin' || userRole === 'counselor' || userRole === 'student') && (
                    <div className="absolute right-0 mt-2 w-48 bg-popover text-foreground border border-border rounded-lg shadow-moderate p-2">
                      {userRole === 'counselor' && (
                        <>
                          <Button
                            variant="ghost"
                            fullWidth
                            onClick={() => { setIsProfileMenuOpen(false); navigate('/counselor-dashboard?section=bio'); }}
                            iconName="UserCircle"
                            iconPosition="left"
                            className="justify-start"
                          >
                            Bio
                          </Button>
                          <Button
                            variant="ghost"
                            fullWidth
                            onClick={() => { setIsProfileMenuOpen(false); navigate('/counselor-dashboard?section=settings'); }}
                            iconName="Settings"
                            iconPosition="left"
                            className="justify-start"
                          >
                            Settings
                          </Button>
                        </>
                      )}
                      {userRole === 'student' && (
                        <>
                          <Button
                            variant="ghost"
                            fullWidth
                            onClick={() => { setIsProfileMenuOpen(false); navigate('/student-dashboard?section=profile'); }}
                            iconName="UserCircle"
                            iconPosition="left"
                            className="justify-start"
                          >
                            Profile
                          </Button>
                          <Button
                            variant="ghost"
                            fullWidth
                            onClick={() => { setIsProfileMenuOpen(false); navigate('/student-dashboard?section=settings'); }}
                            iconName="Settings"
                            iconPosition="left"
                            className="justify-start"
                          >
                            Settings
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        fullWidth
                        onClick={handleLogout}
                        iconName="LogOut"
                        iconPosition="left"
                        className="justify-start hover:bg-error/10"
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCrisisSupport}
                iconName="Heart"
                className="text-error border-error/20"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                iconName={isMobileMenuOpen ? "X" : "Menu"}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-therapeutic border-b border-border shadow-moderate animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Button
                  key={`${item?.path}-${item?.label}`}
                  variant={location?.pathname === item?.path ? "secondary" : "ghost"}
                  fullWidth
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  className="justify-start"
                >
                  {item?.label}
                </Button>
              ))}
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {userRole} Portal
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Welcome back
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="User"
                    className="rounded-full"
                  />
                </div>
                {(userRole === 'admin' || userRole === 'counselor' || userRole === 'student') && (
                  <div className="space-y-2">
                    {userRole === 'counselor' && (
                      <>
                        <Button
                          variant="ghost"
                          fullWidth
                          onClick={() => { setIsMobileMenuOpen(false); navigate('/counselor-dashboard?section=bio'); }}
                          iconName="UserCircle"
                          iconPosition="left"
                          className="justify-start"
                        >
                          Bio
                        </Button>
                        <Button
                          variant="ghost"
                          fullWidth
                          onClick={() => { setIsMobileMenuOpen(false); navigate('/counselor-dashboard?section=settings'); }}
                          iconName="Settings"
                          iconPosition="left"
                          className="justify-start"
                        >
                          Settings
                        </Button>
                      </>
                    )}
                    {userRole === 'student' && (
                      <>
                        <Button
                          variant="ghost"
                          fullWidth
                          onClick={() => { setIsMobileMenuOpen(false); navigate('/student-dashboard?section=profile'); }}
                          iconName="UserCircle"
                          iconPosition="left"
                          className="justify-start"
                        >
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          fullWidth
                          onClick={() => { setIsMobileMenuOpen(false); navigate('/student-dashboard?section=settings'); }}
                          iconName="Settings"
                          iconPosition="left"
                          className="justify-start"
                        >
                          Settings
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleLogout}
                      iconName="LogOut"
                      iconPosition="left"
                      className="text-error border-error/20 hover:bg-error/10"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Crisis Support Modal */}
      {showCrisisSupport && (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-lg animate-growth">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Heart" className="text-error" size={24} />
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Crisis Support
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCrisisSupport(false)}
                iconName="X"
              />
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you're experiencing a mental health crisis, immediate help is available.
              </p>
              
              <div className="space-y-2">
                <Button
                  variant="destructive"
                  fullWidth
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call Crisis Hotline: 988
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => navigate('/ai-chatbot-support')}
                >
                  Chat with AI Support
                </Button>
                
                <Button
                  variant="secondary"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => navigate('/appointment-booking')}
                >
                  Emergency Appointment
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                You are not alone. Help is always available.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
