import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CounselorCard from './components/CounselorCard';
import AppointmentCalendar from './components/AppointmentCalendar';
import BookingForm from './components/BookingForm';
import FilterPanel from './components/FilterPanel';
import ConfirmationModal from './components/ConfirmationModal';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('browse'); // browse, calendar, form, confirm
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Mock counselors data
  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Licensed Clinical Psychologist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      experience: "8 years experience",
      rating: 4.9,
      reviewCount: 127,
      location: "Student Wellness Center",
      availability: "available",
      isOnline: true,
      specializations: ["Anxiety & Stress", "Depression", "Academic Pressure"],
      bio: `Dr. Chen specializes in helping students navigate academic stress and anxiety. She uses evidence-based approaches including CBT and mindfulness techniques.`
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      title: "Licensed Marriage & Family Therapist",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      experience: "12 years experience",
      rating: 4.8,
      reviewCount: 203,
      location: "Counseling Services",
      availability: "busy",
      isOnline: true,
      specializations: ["Relationships", "Family Issues", "Identity & Self-Esteem"],
      bio: `Dr. Rodriguez focuses on relationship dynamics and identity development during the college years.`
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      title: "Clinical Social Worker",
      avatar: "https://images.unsplash.com/photo-1594824388853-d0c7b3b8b6b8?w=400&h=400&fit=crop&crop=face",
      experience: "6 years experience",
      rating: 4.7,
      reviewCount: 89,
      location: "Crisis Support Center",
      availability: "available",
      isOnline: false,
      specializations: ["Trauma & PTSD", "Crisis Support", "Substance Abuse"],
      bio: `Dr. Johnson provides crisis intervention and trauma-informed care for students in need of immediate support.`
    },
    {
      id: 4,
      name: "Dr. James Park",
      title: "Licensed Professional Counselor",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      experience: "10 years experience",
      rating: 4.9,
      reviewCount: 156,
      location: "Student Health Services",
      availability: "available",
      isOnline: true,
      specializations: ["Eating Disorders", "Body Image", "Perfectionism"],
      bio: `Dr. Park specializes in eating disorders and body image issues common among college students.`
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      title: "Psychiatric Nurse Practitioner",
      avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
      experience: "15 years experience",
      rating: 4.8,
      reviewCount: 178,
      location: "Mental Health Clinic",
      availability: "unavailable",
      isOnline: false,
      specializations: ["Medication Management", "Bipolar Disorder", "ADHD"],
      bio: `Dr. Thompson provides psychiatric evaluations and medication management for students with mental health conditions.`
    },
    {
      id: 6,
      name: "Dr. David Kim",
      title: "Licensed Clinical Psychologist",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      experience: "9 years experience",
      rating: 4.6,
      reviewCount: 134,
      location: "Behavioral Health Center",
      availability: "available",
      isOnline: true,
      specializations: ["Grief & Loss", "Life Transitions", "Mindfulness"],
      bio: `Dr. Kim helps students process grief, loss, and major life transitions using mindfulness-based approaches.`
    }
  ];

  // Mock available slots
  const availableSlots = [
    { date: '2025-01-13', time: '9:00 AM' },
    { date: '2025-01-13', time: '10:30 AM' },
    { date: '2025-01-13', time: '2:00 PM' },
    { date: '2025-01-13', time: '3:30 PM' },
    { date: '2025-01-14', time: '9:00 AM' },
    { date: '2025-01-14', time: '11:00 AM' },
    { date: '2025-01-14', time: '1:00 PM' },
    { date: '2025-01-15', time: '10:00 AM' },
    { date: '2025-01-15', time: '2:30 PM' },
    { date: '2025-01-15', time: '4:00 PM' },
    { date: '2025-01-16', time: '9:30 AM' },
    { date: '2025-01-16', time: '11:30 AM' },
    { date: '2025-01-17', time: '10:00 AM' },
    { date: '2025-01-17', time: '1:30 PM' },
    { date: '2025-01-17', time: '3:00 PM' }
  ];

  // Filter counselors based on search and filters
  const filteredCounselors = counselors?.filter(counselor => {
    // Search filter
    if (searchQuery && !counselor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !counselor?.specializations?.some(spec => spec?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
      return false;
    }

    // Specialization filter
    if (filters?.specialization && !counselor?.specializations?.some(spec => 
        spec?.toLowerCase()?.includes(filters?.specialization?.toLowerCase()))) {
      return false;
    }

    // Availability filter
    if (filters?.availability === 'today' && counselor?.availability !== 'available') {
      return false;
    }

    // Highly rated filter
    if (filters?.highlyRated && counselor?.rating < 4.5) {
      return false;
    }

    // Emergency available filter
    if (filters?.emergencyAvailable && counselor?.availability === 'unavailable') {
      return false;
    }

    return true;
  });

  const handleBookAppointment = (counselorId) => {
    const counselor = counselors?.find(c => c?.id === counselorId);
    setSelectedCounselor(counselor);
    setCurrentStep('calendar');
  };

  const handleViewProfile = (counselorId) => {
    // In a real app, this would navigate to counselor profile
    console.log('View profile for counselor:', counselorId);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleProceedToForm = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('form');
    }
  };

  const handleFormSubmit = (formData) => {
    const appointment = {
      ...formData,
      counselor: selectedCounselor,
      date: selectedDate,
      time: selectedTime,
      id: Date.now() // Mock ID
    };
    setAppointmentData(appointment);
    setShowConfirmation(true);
  };

  const handleConfirmAppointment = async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setShowConfirmation(false);
    
    // Navigate to dashboard with success message
    navigate('/student-dashboard', { 
      state: { 
        message: 'Appointment booked successfully!',
        appointment: appointmentData
      }
    });
  };

  const handleBackToCalendar = () => {
    setCurrentStep('calendar');
  };

  const handleBackToBrowse = () => {
    setCurrentStep('browse');
    setSelectedCounselor(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleEmergencyBooking = () => {
    setFilters({
      ...filters,
      emergencyAvailable: true,
      availability: 'today'
    });
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'browse', label: 'Select Counselor', icon: 'Users' },
      { key: 'calendar', label: 'Choose Date & Time', icon: 'Calendar' },
      { key: 'form', label: 'Booking Details', icon: 'FileText' }
    ];

    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.key}>
            <div className={`flex items-center space-x-2 ${
              currentStep === step?.key ? 'text-primary' : 
              steps?.findIndex(s => s?.key === currentStep) > index ? 'text-success' : 'text-muted-foreground'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step?.key ? 'bg-primary text-primary-foreground' :
                steps?.findIndex(s => s?.key === currentStep) > index ? 'bg-success text-success-foreground': 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={16} />
              </div>
              <span className="text-sm font-medium hidden sm:block">{step?.label}</span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`w-8 h-0.5 ${
                steps?.findIndex(s => s?.key === currentStep) > index ? 'bg-success' : 'bg-muted'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Book Your Counseling Session
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with licensed mental health professionals who understand the unique challenges of student life. 
              Your wellbeing is our priority.
            </p>
          </div>

          {/* Emergency Support Banner */}
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Heart" className="text-error" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Need immediate support?</h3>
                  <p className="text-sm text-muted-foreground">
                    Crisis support is available 24/7. Don't wait if you're in distress.
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmergencyBooking}
                  iconName="Zap"
                  iconPosition="left"
                  className="border-error/20 text-error hover:bg-error/10"
                >
                  Emergency Booking
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Crisis Hotline: 988
                </Button>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Browse Counselors Step */}
          {currentStep === 'browse' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filter Panel */}
              <div className="lg:col-span-1">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  onClearFilters={() => setFilters({})}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>

              {/* Counselors List */}
              <div className="lg:col-span-3">
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search counselors by name or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {filteredCounselors?.length} counselor{filteredCounselors?.length !== 1 ? 's' : ''} available
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/ai-chatbot-support')}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Try AI Support First
                  </Button>
                </div>

                {/* Counselors Grid */}
                <div className="space-y-4">
                  {filteredCounselors?.map(counselor => (
                    <CounselorCard
                      key={counselor?.id}
                      counselor={counselor}
                      onBookAppointment={handleBookAppointment}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>

                {filteredCounselors?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="UserX" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No counselors found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilters({});
                        setSearchQuery('');
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calendar Step */}
          {currentStep === 'calendar' && selectedCounselor && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Schedule with {selectedCounselor?.name}
                  </h2>
                  <p className="text-muted-foreground">{selectedCounselor?.title}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleBackToBrowse}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Counselors
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AppointmentCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  availableSlots={availableSlots}
                  onTimeSelect={handleTimeSelect}
                  selectedTime={selectedTime}
                />

                {selectedDate && selectedTime && (
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                      Appointment Summary
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Icon name="User" className="text-muted-foreground" />
                        <span className="text-foreground">{selectedCounselor?.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Calendar" className="text-muted-foreground" />
                        <span className="text-foreground">{selectedDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Clock" className="text-muted-foreground" />
                        <span className="text-foreground">{selectedTime}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" className="text-muted-foreground" />
                        <span className="text-foreground">{selectedCounselor?.location}</span>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      fullWidth
                      onClick={handleProceedToForm}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Continue to Booking Details
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Booking Form Step */}
          {currentStep === 'form' && selectedCounselor && selectedDate && selectedTime && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Complete Your Booking
                </h2>
                <Button
                  variant="outline"
                  onClick={handleBackToCalendar}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Calendar
                </Button>
              </div>

              <BookingForm
                counselor={selectedCounselor}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handleFormSubmit}
                onCancel={handleBackToCalendar}
              />
            </div>
          )}
        </div>
      </main>
      {/* Confirmation Modal */}
      {showConfirmation && appointmentData && (
        <ConfirmationModal
          appointment={appointmentData}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentBooking;