import { useState, useMemo, useCallback } from 'react';

const MOCK_PROFILE = {
  // Identity
  name: 'Jaswant Singh',
  photoUrl: null,
  joinDate: '2022-04-15',
  
  // Business Information
  businessName: 'Galaxy Stays Pvt Ltd',
  businessDescription: 'Premium student accommodations near North Campus with focus on safety and hygiene.',
  businessType: 'Private Limited',
  yearsInBusiness: 4,
  officeAddress: '123 Main St, New Delhi',
  website: 'www.galaxystays.com',
  languagesSpoken: ['English', 'Hindi', 'Punjabi'],
  officeHours: '9:00 AM - 6:00 PM',
  
  // Contact Information
  primaryPhone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  email: 'jaswant@example.com',
  emergencyContact: '+91 91234 56789',
  
  // Verifications
  verifications: {
    email: { status: 'verified', lastVerified: '2022-04-15' },
    phone: { status: 'verified', lastVerified: '2022-04-15' },
    governmentId: { status: 'pending', submittedDate: '2023-10-20' },
    address: { status: 'unverified' },
    business: { status: 'verified', lastVerified: '2023-01-10' }
  },
  
  // Security
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: '2023-05-12',
    recentSessions: [
      { id: 1, device: 'Chrome on Windows', location: 'New Delhi', time: 'Active now' },
      { id: 2, device: 'Safari on iPhone', location: 'New Delhi', time: 'Yesterday' }
    ]
  },
  
  // Privacy
  privacy: {
    showPhone: true,
    showWhatsApp: true,
    showEmail: false,
    showAddress: true,
    showResponseRate: true
  },
  
  // Notifications
  notifications: {
    emailNewLeads: true,
    emailMessages: true,
    emailReviews: true,
    emailMarketing: false,
    inAppNewLeads: true,
    inAppMessages: true,
    inAppReviews: true,
  },
  
  // Mock Metrics
  totalListings: 4,
  totalReviews: 87,
  averageRating: 4.8,
  responseRate: 98,
  averageResponseTime: '8 mins'
};

const MOCK_ACTIVITY_LOG = [
  { id: 1, action: 'Updated Privacy Settings', date: 'Just now' },
  { id: 2, action: 'Logged in from Chrome on Windows', date: '2 hours ago' },
  { id: 3, action: 'Submitted Government ID for verification', date: '2023-10-20' },
  { id: 4, action: 'Published property "Sunrise Hostel"', date: '2023-09-15' },
  { id: 5, action: 'Changed password', date: '2023-05-12' }
];

export function useOwnerProfile() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [activityLog, setActivityLog] = useState(MOCK_ACTIVITY_LOG);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfile = useCallback((updates) => {
    setIsSaving(true);
    // Simulate network delay
    setTimeout(() => {
      setProfile(prev => ({ ...prev, ...updates }));
      
      // Add to activity log
      const actionName = Object.keys(updates).includes('privacy') 
        ? 'Updated Privacy Settings'
        : Object.keys(updates).includes('notifications')
          ? 'Updated Notification Preferences'
          : 'Updated Profile Information';

      setActivityLog(prev => [
        { id: Date.now(), action: actionName, date: 'Just now' },
        ...prev
      ]);
      
      setIsSaving(false);
    }, 600);
  }, []);

  // Compute profile completion logic
  const completionPercentage = useMemo(() => {
    let total = 0;
    let completed = 0;
    
    const tasks = [
      { id: 'photo', label: 'Upload Profile Photo', isComplete: !!profile.photoUrl },
      { id: 'phone', label: 'Verify Phone Number', isComplete: profile.verifications.phone.status === 'verified' },
      { id: 'govId', label: 'Upload Government ID', isComplete: profile.verifications.governmentId.status === 'verified' },
      { id: 'business', label: 'Add Business Description', isComplete: !!profile.businessDescription },
      { id: 'address', label: 'Verify Business Address', isComplete: profile.verifications.address.status === 'verified' }
    ];

    tasks.forEach(task => {
      total += 1;
      if (task.isComplete) completed += 1;
    });

    return {
      percentage: Math.round((completed / total) * 100),
      tasks
    };
  }, [profile]);

  // Compute Trust Score (Mock logic)
  const trustScore = useMemo(() => {
    let score = 50; // Base score
    if (profile.verifications.governmentId.status === 'verified') score += 15;
    if (profile.verifications.business.status === 'verified') score += 10;
    if (profile.verifications.phone.status === 'verified') score += 5;
    if (profile.verifications.email.status === 'verified') score += 5;
    if (profile.averageRating >= 4.5) score += 10;
    if (profile.responseRate >= 90) score += 5;
    
    return Math.min(100, score);
  }, [profile]);

  return {
    profile,
    updateProfile,
    isSaving,
    completionPercentage,
    trustScore,
    activityLog
  };
}
