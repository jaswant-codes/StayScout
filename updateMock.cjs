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
    preference: 'boys',
    description: 'A premium student accommodation with all modern amenities. Walking distance to major colleges. Includes daily housekeeping, 3-time meals, and high-speed WiFi.',
    availability: 'available',
    moveInDate: '2026-07-01',
    facilities: ['WiFi', 'AC', 'Food Included', 'Laundry', 'Security'],
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
      { id: 'r1', type: 'Private Room', price: 15000, available: true, features: ['AC', 'Attached Bath'] },
      { id: 'r2', type: 'Double Sharing', price: 12000, available: true, features: ['AC', 'Shared Bath'] }
    ],
    rules: ['No smoking inside the premises', 'Gate closes at 11:00 PM', 'No outside guests allowed overnight'],
    safety: ['24/7 Security Guard', 'CCTV in common areas', 'Biometric Access'],
    nearby: { colleges: ['Delhi University - 500m', 'Hansraj College - 1.2km'], transit: ['GTB Nagar Metro - 800m'], hospitals: ['Hindu Rao Hospital - 2km'] },
    location: 'Delhi, North Campus'
  },
  {
    id: 'demo-prop-2',
    name: 'The Student Housing Co.',
    propertyType: 'hostel',
    city: 'Pune',
    area: 'Viman Nagar',
    rent: 8500,
    deposit: 8500,
    preference: 'girls',
    description: 'Vibrant student community hostel. Features study rooms, gaming zones, and a fully equipped gym. Perfect for making connections.',
    availability: 'available',
    moveInDate: '2026-06-30',
    facilities: ['WiFi', 'Gym', 'Security', 'Library'],
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
      { id: 'r3', type: 'Triple Sharing', price: 8500, available: true, features: ['Study Desk', 'Locker'] }
    ],
    rules: ['Quiet hours strictly enforced after 10 PM'],
    safety: ['Female Security Guards', 'Keycard Entry'],
    nearby: { colleges: ['Symbiosis - 1km'], transit: ['Airport - 3km'], hospitals: ['Ruby Hall - 5km'] },
    location: 'Pune, Viman Nagar'
  },
  {
    id: 'demo-prop-3',
    name: 'CoLive Spaces Bangalore',
    propertyType: 'flat',
    city: 'Bangalore',
    area: 'Koramangala',
    rent: 15000,
    deposit: 30000,
    preference: 'any',
    description: 'Fully furnished shared apartment. No broker fees. Move-in ready with premium appliances and smart TV.',
    availability: 'available',
    moveInDate: '2026-06-25',
    facilities: ['WiFi', 'AC', 'TV', 'Washing Machine'],
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
    ],
    ownerId: 'demo-owner-3',
    avgRating: 4.7,
    reviewCount: 210,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    landmark: 'Sony World Signal',
    college: 'Christ University',
    roomTypes: [
      { id: 'r4', type: 'Entire 1BHK', price: 15000, available: true, features: ['Fully Furnished', 'Kitchen'] }
    ],
    rules: ['No loud parties', 'Pets allowed with prior approval'],
    safety: ['Gated Society', 'Intercom'],
    nearby: { colleges: ['Christ University - 2.5km'], transit: ['Silk Board - 3km'], hospitals: ['St. John\\'s - 2km'] },
    location: 'Bangalore, Koramangala'
  },
  {
    id: 'demo-prop-4',
    name: 'Cozy PG for Girls',
    propertyType: 'pg',
    city: 'Mumbai',
    area: 'Andheri West',
    rent: 18000,
    deposit: 20000,
    preference: 'girls',
    description: 'Safe and secure PG for girls with strict security. Meals not included but kitchen available.',
    availability: 'available',
    moveInDate: '2026-07-15',
    facilities: ['WiFi', 'Security', 'Washing Machine'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
    ownerId: 'demo-owner-4',
    avgRating: 4.5,
    reviewCount: 45,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    landmark: 'Andheri Station',
    college: 'Mithibai College',
    roomTypes: [
      { id: 'r5', type: 'Double Sharing', price: 18000, available: true, features: ['Attached Bath'] }
    ],
    rules: ['Gate closes at 9:30 PM'],
    safety: ['CCTV'],
    nearby: { colleges: ['Mithibai - 1.5km'], transit: ['Andheri Station - 500m'] },
    location: 'Mumbai, Andheri West'
  },
  {
    id: 'demo-prop-5',
    name: 'Boys Hostel Hub',
    propertyType: 'hostel',
    city: 'Chennai',
    area: 'Guindy',
    rent: 6000,
    deposit: 10000,
    preference: 'boys',
    description: 'Affordable hostel for boys. Close to IIT Madras.',
    availability: 'booked',
    moveInDate: '2026-08-01',
    facilities: ['Food Included', 'Security'],
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
    ownerId: 'demo-owner-5',
    avgRating: 3.8,
    reviewCount: 20,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    landmark: 'Guindy National Park',
    college: 'IIT Madras',
    roomTypes: [
      { id: 'r6', type: 'Four Sharing', price: 6000, available: false, features: ['Common Bath'] }
    ],
    rules: ['No smoking'],
    safety: ['Warden on premises'],
    nearby: { colleges: ['IIT Madras - 2km'] },
    location: 'Chennai, Guindy'
  },
  {
    id: 'demo-prop-6',
    name: 'Luxury Studio Flat',
    propertyType: 'flat',
    city: 'Pune',
    area: 'Koregaon Park',
    rent: 25000,
    deposit: 50000,
    preference: 'any',
    description: 'High end studio flat for those who want privacy. Includes all modern appliances.',
    availability: 'available',
    moveInDate: '2026-07-05',
    facilities: ['WiFi', 'AC', 'TV', 'Washing Machine', 'Gym'],
    images: ['https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80'],
    ownerId: 'demo-owner-6',
    avgRating: 4.2,
    reviewCount: 15,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    landmark: 'Osho Ashram',
    college: 'Fergusson College',
    roomTypes: [
      { id: 'r7', type: 'Studio', price: 25000, available: true, features: ['Kitchen', 'Balcony'] }
    ],
    rules: ['No parties'],
    safety: ['Gated Society'],
    nearby: { transit: ['Pune Station - 4km'] },
    location: 'Pune, Koregaon Park'
  }
];`;

const startIdx = content.indexOf('export let mockProperties = [');
const endIdx = content.indexOf('];\r\n\r\n// Fuzzy match', startIdx) + 2;

if (startIdx !== -1 && endIdx !== -1) {
  const newContent = content.substring(0, startIdx) + newMock + content.substring(endIdx);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully updated mock data in useProperties.js');
} else {
  // try different newline match
  const altEndIdx = content.indexOf('];\n\n// Fuzzy match', startIdx) + 2;
  if(altEndIdx !== 1) {
      const newContent = content.substring(0, startIdx) + newMock + content.substring(altEndIdx);
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Successfully updated mock data in useProperties.js');
  } else {
    console.error('Could not find mockProperties block in useProperties.js');
  }
}
