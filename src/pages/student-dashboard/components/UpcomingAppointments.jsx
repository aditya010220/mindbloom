import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointments = () => {
  const navigate = useNavigate();

  const upcomingAppointments = [
    {
      id: 1,
      counselorName: 'Dr. Sarah Johnson',
      counselorTitle: 'Licensed Clinical Psychologist',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      time: '2:00 PM',
      duration: 50,
      type: 'Individual Therapy',
      location: 'Room 204, Wellness Center',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      status: 'confirmed'
    },
    {
      id: 2,
      counselorName: 'Dr. Michael Chen',
      counselorTitle: 'Mental Health Counselor',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      time: '10:30 AM',
      duration: 45,
      type: 'Follow-up Session',
      location: 'Virtual Meeting',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      status: 'pending'
    }
  ];

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    
    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return 'Tomorrow';
    } else {
      return date?.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Upcoming Appointments
          </h2>
          <p className="text-sm text-muted-foreground">
            Your scheduled counseling sessions
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/appointment-booking')}
          iconName="Plus"
          iconPosition="left"
        >
          Book New
        </Button>
      </div>
      <div className="space-y-4">
        {upcomingAppointments?.map((appointment) => (
          <div
            key={appointment?.id}
            className="p-4 bg-muted/20 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors duration-200"
          >
            <div className="flex items-start gap-4">
              {/* Counselor Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                <img
                  src={appointment?.avatar}
                  alt={appointment?.counselorName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {appointment?.counselorName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment?.counselorTitle}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment?.status)}`}>
                    {appointment?.status?.charAt(0)?.toUpperCase() + appointment?.status?.slice(1)}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(appointment?.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{appointment?.time} ({appointment?.duration} min)</span>
                  </div>
                </div>

                {/* Session Type and Location */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="User" size={14} />
                    <span>{appointment?.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name={appointment?.location?.includes('Virtual') ? 'Video' : 'MapPin'} size={14} />
                    <span>{appointment?.location}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {upcomingAppointments?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">No upcoming appointments</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Schedule a session with one of our counselors to get started.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/appointment-booking')}
            iconName="Plus"
            iconPosition="left"
          >
            Book Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;