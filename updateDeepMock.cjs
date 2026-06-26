const fs = require('fs');
const file = 'src/hooks/useProperties.js';
let content = fs.readFileSync(file, 'utf8');

const newMock = `export let mockProperties = [
  {
    id: 'demo-prop-1',
    name: 'Stanza Living - Premium PG',
    propertyType: 'pg',
    city: 'Delhi',
    area: 'North Campus',
    rent: 12000,
    deposit: 12000,
    maintenance: 500,
    brokerage: 0,
    electricity: 'As per usage (₹9/unit)',
    water: 'Included',
    refundableDeposit: 12000,
    preference: 'boys',
    
    // Structured Description
    description: {
      overview: 'A premium student accommodation with all modern amenities. Designed specifically for DU students who want a hassle-free college life.',
      whyChoose: ['Walking distance to campus', 'Excellent high-speed WiFi', 'Daily housekeeping', 'Safe neighbourhood with CCTV'],
      bestFor: 'First-year DU students looking for a secure, food-included stay.',
      nearbyColleges: 'Delhi University North Campus, Hansraj College, SRCC.',
      transportation: '5 mins to GTB Nagar Metro. E-rickshaws available 24/7.',
      lifestyle: 'Vibrant student community, close to Hudson Lane cafes.'
    },

    availability: 'available',
    moveInDate: '2026-07-01',
    bedsAvailable: 4,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    
    facilities: ['WiFi', 'AC', 'Food Included', 'Laundry', 'Security', 'Power Backup', 'RO Water', 'Housekeeping', 'Study Table', 'Attached Bathroom'],
    
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1e525044c7?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
    ],
    ownerId: 'demo-owner-1',
    avgRating: 4.8,
    reviewCount: 124,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    landmark: 'Near DU North Campus',
    college: 'Delhi University',
    
    roomTypes: [
      { id: 'r1', type: 'Private Room', price: 15000, available: true, area: '120 sq.ft', furnishing: 'Fully Furnished', attachedBath: true, balcony: false },
      { id: 'r2', type: 'Double Sharing', price: 12000, available: true, area: '180 sq.ft', furnishing: 'Fully Furnished', attachedBath: true, balcony: true }
    ],
    
    rules: [
      { label: 'Visitors Allowed', value: 'No' },
      { label: 'Smoking', value: 'Strictly Prohibited' },
      { label: 'Alcohol', value: 'Strictly Prohibited' },
      { label: 'Pets', value: 'Not Allowed' },
      { label: 'Curfew', value: '10:30 PM' },
      { label: 'Quiet Hours', value: '11:00 PM to 6:00 AM' }
    ],
    
    safety: ['24/7 Night Guard', 'CCTV in common areas', 'Biometric Entry', 'Fire Safety', 'Emergency Contact'],
    
    food: {
      veg: true,
      nonVeg: false,
      breakfast: true,
      lunch: true,
      dinner: true,
      kitchen: false,
      included: true,
      mealTimings: 'Breakfast: 7:30AM-9:30AM, Dinner: 8:00PM-10:00PM'
    },
    
    commute: [
      { type: 'walk', time: '5 min' },
      { type: 'metro', time: '2 min' }
    ],
    
    nearby: [
      { category: 'College', name: 'Hansraj College', distance: '500m', walkTime: '5 min', driveTime: '2 min' },
      { category: 'Metro', name: 'GTB Nagar', distance: '800m', walkTime: '8 min', driveTime: '3 min' },
      { category: 'Hospital', name: 'Hindu Rao', distance: '2.5km', walkTime: '25 min', driveTime: '8 min' },
      { category: 'Restaurant', name: 'Hudson Cafe', distance: '400m', walkTime: '4 min', driveTime: '1 min' }
    ],
    
    location: 'Delhi, North Campus',
    
    ownerDetails: {
      name: 'Rakesh Sharma',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      joinedSince: 'Jan 2023',
      responseRate: '98%',
      responseTime: 'within an hour',
      totalListings: 3,
      rating: 4.9
    },

    categoryRatings: {
      cleanliness: 4.8,
      safety: 4.9,
      food: 4.5,
      wifi: 4.2,
      location: 5.0,
      valueForMoney: 4.6
    }
  },
  {
    id: 'demo-prop-2',
    name: 'The Student Housing Co.',
    propertyType: 'hostel',
    city: 'Pune',
    area: 'Viman Nagar',
    rent: 8500,
    deposit: 8500,
    maintenance: 0,
    brokerage: 0,
    electricity: 'Included',
    water: 'Included',
    refundableDeposit: 8500,
    preference: 'girls',
    
    description: {
      overview: 'Vibrant student community hostel specifically for girls. Features study rooms, gaming zones, and a fully equipped gym.',
      whyChoose: ['Safe and secure for girls', 'In-house gym', 'Study rooms', 'Close to Symbiosis'],
      bestFor: 'Symbiosis students looking for an active community.',
      nearbyColleges: 'Symbiosis International University, Christ College.',
      transportation: 'Auto stand right outside. 10 mins to airport.',
      lifestyle: 'Very active, lots of events and get-togethers.'
    },

    availability: 'available',
    moveInDate: '2026-06-30',
    bedsAvailable: 2,
    lastUpdated: new Date(Date.now() - 86400000).toISOString(),
    
    facilities: ['WiFi', 'Gym', 'Security', 'Library', 'Power Backup', 'RO Water', 'Washing Machine', 'Attached Bathroom'],
    
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
    ],
    ownerId: 'demo-owner-2',
    avgRating: 4.9,
    reviewCount: 89,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    landmark: 'Phoenix Mall',
    college: 'Symbiosis International University',
    
    roomTypes: [
      { id: 'r3', type: 'Triple Sharing', price: 8500, available: true, area: '200 sq.ft', furnishing: 'Fully Furnished', attachedBath: true, balcony: false }
    ],
    
    rules: [
      { label: 'Visitors Allowed', value: 'Females only' },
      { label: 'Curfew', value: '10:00 PM' },
      { label: 'Quiet Hours', value: 'Strictly after 10 PM' }
    ],
    
    safety: ['Female Security Guards', 'Keycard Entry', 'CCTV', 'Girls Warden'],
    
    food: {
      veg: true,
      nonVeg: true,
      breakfast: true,
      lunch: false,
      dinner: true,
      kitchen: true,
      included: true,
      mealTimings: 'Breakfast: 8AM-10AM, Dinner: 7:30PM-9:30PM'
    },
    
    commute: [
      { type: 'walk', time: '12 min' },
      { type: 'drive', time: '4 min' }
    ],
    
    nearby: [
      { category: 'College', name: 'Symbiosis', distance: '1km', walkTime: '12 min', driveTime: '4 min' },
      { category: 'Mall', name: 'Phoenix Mall', distance: '1.5km', walkTime: '18 min', driveTime: '5 min' }
    ],
    
    location: 'Pune, Viman Nagar',
    
    ownerDetails: {
      name: 'Priya Desai',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      joinedSince: 'Mar 2024',
      responseRate: '100%',
      responseTime: 'within 10 minutes',
      totalListings: 1,
      rating: 5.0
    },

    categoryRatings: {
      cleanliness: 5.0,
      safety: 5.0,
      food: 4.7,
      wifi: 4.5,
      location: 4.8,
      valueForMoney: 4.9
    }
  }
];`;

const startIdx = content.indexOf('export let mockProperties = [');
const endIdx = content.indexOf('];\n\n// Fuzzy match', startIdx);
let realEndIdx = -1;
if(endIdx !== -1) realEndIdx = endIdx + 2;
else {
  const alt = content.indexOf('];\r\n\r\n// Fuzzy match', startIdx);
  if(alt !== -1) realEndIdx = alt + 2;
}

if (startIdx !== -1 && realEndIdx !== -1) {
  const newContent = content.substring(0, startIdx) + newMock + content.substring(realEndIdx);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully updated deep mock data in useProperties.js');
} else {
  console.error('Could not find mockProperties block in useProperties.js');
}
