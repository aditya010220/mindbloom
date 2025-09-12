import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import StressHeatmap from './components/StressHeatmap';
import TrendChart from './components/TrendChart';
import PolicyRecommendations from './components/PolicyRecommendations';
import CounselorWorkload from './components/CounselorWorkload';
import ExportPanel from './components/ExportPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({ autoRefresh: false, granularity: 'weekly', anonymize: true });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock key metrics data
  const keyMetrics = [
    {
      title: 'Total Active Students',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Students currently enrolled in mental health programs'
    },
    {
      title: 'Anonymous Risk Percentage',
      value: '18.3%',
      change: '-2.1%',
      changeType: 'positive',
      icon: 'Shield',
      description: 'Students identified as requiring additional support'
    },
    {
      title: 'Counselor Utilization',
      value: '87.2%',
      change: '+5.8%',
      changeType: 'negative',
      icon: 'Activity',
      description: 'Average counselor capacity utilization rate'
    },
    {
      title: 'Resource Engagement',
      value: '94.6%',
      change: '+8.3%',
      changeType: 'positive',
      icon: 'BookOpen',
      description: 'Students actively using digital wellness resources'
    },
    {
      title: 'Average Response Time',
      value: '4.2 hrs',
      change: '-1.3 hrs',
      changeType: 'positive',
      icon: 'Clock',
      description: 'Time from appointment request to first available slot'
    },
    {
      title: 'Crisis Interventions',
      value: '23',
      change: '-8',
      changeType: 'positive',
      icon: 'AlertTriangle',
      description: 'Emergency interventions this month'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'counselors', label: 'Counselors', icon: 'Users' },
    { id: 'policies', label: 'Policies', icon: 'Lightbulb' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  const formatTime = (date) => {
    return date?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setCurrentTime(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveConfig = () => {
    setShowConfig(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive mental health insights and institutional analytics
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Last updated: {formatTime(currentTime)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="RefreshCw" size="sm" onClick={handleRefresh} loading={isRefreshing}>
                  Refresh Data
                </Button>
                <Button variant="outline" iconName="Settings" size="sm" onClick={() => setShowConfig(true)}>
                  Configure
                </Button>
                <Button variant="default" iconName="AlertTriangle" size="sm">
                  Crisis Alerts (3)
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap gentle-transition ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyMetrics?.map((metric, index) => (
                  <MetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    changeType={metric?.changeType}
                    icon={metric?.icon}
                    description={metric?.description}
                  />
                ))}
              </div>

              {/* Main Analytics */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="xl:col-span-2">
                  <StressHeatmap />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-6 rounded-lg">
                <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Users"
                    iconPosition="left"
                    onClick={() => navigate('/counselor-dashboard')}
                  >
                    View Counselors
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => navigate('/appointment-booking')}
                  >
                    Appointment System
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => navigate('/ai-chatbot-support')}
                  >
                    AI Support Logs
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BarChart3"
                    iconPosition="left"
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-8">
              <TrendChart />
              
              {/* Additional Trend Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Calendar" size={20} className="text-primary" />
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Seasonal Patterns
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-sm text-foreground">Exam Period Stress Spike</span>
                      <span className="text-sm font-medium text-error">+40%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-sm text-foreground">Holiday Season Dip</span>
                      <span className="text-sm font-medium text-success">-25%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-sm text-foreground">New Semester Anxiety</span>
                      <span className="text-sm font-medium text-warning">+18%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Target" size={20} className="text-primary" />
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Intervention Success
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-heading font-semibold text-success">89.3%</p>
                      <p className="text-sm text-muted-foreground">Students show improvement</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-heading font-semibold text-primary">4.2</p>
                      <p className="text-sm text-muted-foreground">Average sessions per student</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-heading font-semibold text-warning">12.5</p>
                      <p className="text-sm text-muted-foreground">Days average treatment duration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'counselors' && (
            <div className="space-y-8">
              <CounselorWorkload />
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-8">
              <PolicyRecommendations />
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-8">
              <ExportPanel />
            </div>
          )}
          {/* Configuration Modal */}
          {showConfig && (
            <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="glass-card w-full max-w-lg rounded-lg p-6 animate-growth">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Settings" size={20} className="text-primary" />
                    <h3 className="text-lg font-heading font-semibold text-foreground">Analytics Configuration</h3>
                  </div>
                  <Button variant="ghost" size="icon" iconName="X" onClick={() => setShowConfig(false)} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto-refresh data</p>
                      <p className="text-xs text-muted-foreground">Refresh dashboard data every 5 minutes</p>
                    </div>
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={config.autoRefresh}
                      onChange={(e) => setConfig((c) => ({ ...c, autoRefresh: e.target.checked }))}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Data granularity</p>
                    <div className="flex gap-2 flex-wrap">
                      {['daily','weekly','monthly'].map((g) => (
                        <label key={g} className={`px-3 py-1 rounded border cursor-pointer text-sm ${config.granularity===g? 'border-primary text-primary bg-primary/5':'border-border'}`}>
                          <input type="radio" name="granularity" value={g} className="hidden" checked={config.granularity===g} onChange={() => setConfig((c)=>({...c,granularity:g}))} />
                          {g.charAt(0).toUpperCase()+g.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Anonymize student data</p>
                      <p className="text-xs text-muted-foreground">Hide personally identifiable information</p>
                    </div>
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={config.anonymize}
                      onChange={(e) => setConfig((c) => ({ ...c, anonymize: e.target.checked }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setShowConfig(false)}>Cancel</Button>
                  <Button variant="default" iconName="Save" iconPosition="left" onClick={handleSaveConfig}>Save</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAnalyticsDashboard;
