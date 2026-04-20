/**
 * Utility helper functions
 */

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export const FACILITIES_LIST = [
  'WiFi',
  'AC',
  'Food',
  'Laundry',
  'Parking',
  'Gym',
  'Power Backup',
  'Hot Water',
  'TV',
  'Fridge',
  'Study Room',
  'CCTV',
  'Security Guard',
  'Housekeeping',
];

export const REVIEW_TAGS = [
  'Food quality',
  'Cleanliness',
  'Safety',
  'Owner behavior',
  'Value for money',
  'Room quality',
];

export const FACILITY_ICONS = {
  WiFi: '📶',
  AC: '❄️',
  Food: '🍽️',
  Laundry: '👔',
  Parking: '🅿️',
  Gym: '💪',
  'Power Backup': '🔋',
  'Hot Water': '🚿',
  TV: '📺',
  Fridge: '🧊',
  'Study Room': '📚',
  CCTV: '📹',
  'Security Guard': '🛡️',
  Housekeeping: '🧹',
};
