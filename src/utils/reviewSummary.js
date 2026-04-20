/**
 * Client-side heuristic "AI" review summary generator.
 * Scans review texts for common keywords and generates
 * a natural-language summary without requiring an external API.
 */

const CATEGORIES = {
  food: {
    keywords: ['food', 'meal', 'mess', 'breakfast', 'lunch', 'dinner', 'kitchen', 'cook', 'tiffin'],
    positive: ['good food', 'tasty', 'delicious', 'great food', 'nice food', 'excellent food', 'quality food'],
    negative: ['bad food', 'poor food', 'terrible food', 'awful food', 'stale', 'unhygienic', 'tasteless'],
    label: 'Food quality',
  },
  cleanliness: {
    keywords: ['clean', 'dirty', 'hygiene', 'neat', 'tidy', 'mess', 'filthy', 'spotless', 'washroom', 'bathroom'],
    positive: ['clean', 'spotless', 'neat', 'tidy', 'well maintained', 'hygienic'],
    negative: ['dirty', 'filthy', 'unhygienic', 'messy', 'unclean', 'not clean'],
    label: 'Cleanliness',
  },
  safety: {
    keywords: ['safe', 'security', 'guard', 'cctv', 'lock', 'secure', 'dangerous', 'unsafe'],
    positive: ['safe', 'secure', 'security', 'cctv', 'guard', 'well guarded'],
    negative: ['unsafe', 'dangerous', 'no security', 'not safe', 'theft', 'stolen'],
    label: 'Safety',
  },
  owner: {
    keywords: ['owner', 'landlord', 'caretaker', 'warden', 'management', 'staff', 'behavior', 'behaviour'],
    positive: ['friendly owner', 'helpful', 'cooperative', 'supportive', 'understanding', 'responsive'],
    negative: ['rude owner', 'unresponsive', 'unfriendly', 'strict', 'unhelpful', 'arrogant'],
    label: 'Owner behavior',
  },
  rooms: {
    keywords: ['room', 'space', 'bed', 'furniture', 'fan', 'ac', 'ventilation', 'spacious', 'cramped'],
    positive: ['spacious', 'well furnished', 'comfortable', 'good room', 'nice room', 'big room'],
    negative: ['small room', 'cramped', 'no ventilation', 'broken furniture', 'tiny'],
    label: 'Rooms',
  },
  wifi: {
    keywords: ['wifi', 'wi-fi', 'internet', 'network', 'connectivity', 'speed'],
    positive: ['good wifi', 'fast internet', 'great wifi', 'stable connection'],
    negative: ['no wifi', 'slow wifi', 'poor internet', 'bad connectivity', 'no internet'],
    label: 'WiFi',
  },
  value: {
    keywords: ['price', 'rent', 'value', 'worth', 'expensive', 'cheap', 'affordable', 'overpriced', 'money'],
    positive: ['affordable', 'value for money', 'reasonable', 'worth it', 'good value', 'cheap'],
    negative: ['expensive', 'overpriced', 'not worth', 'too costly'],
    label: 'Value for money',
  },
};

export function generateReviewSummary(reviews) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  if (reviews.length < 2) {
    return null;
  }

  const allText = reviews.map((r) => r.comment?.toLowerCase() || '').join(' ');
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const insights = [];

  for (const [key, category] of Object.entries(CATEGORIES)) {
    const mentioned = category.keywords.some((kw) => allText.includes(kw));
    if (!mentioned) continue;

    const positiveCount = category.positive.filter((p) => allText.includes(p)).length;
    const negativeCount = category.negative.filter((n) => allText.includes(n)).length;

    if (positiveCount > negativeCount) {
      insights.push({ label: category.label, sentiment: 'positive' });
    } else if (negativeCount > positiveCount) {
      insights.push({ label: category.label, sentiment: 'negative' });
    } else if (positiveCount > 0) {
      insights.push({ label: category.label, sentiment: 'mixed' });
    }
  }

  // Build summary string
  const positives = insights.filter((i) => i.sentiment === 'positive').map((i) => i.label);
  const negatives = insights.filter((i) => i.sentiment === 'negative').map((i) => i.label);
  const mixed = insights.filter((i) => i.sentiment === 'mixed').map((i) => i.label);

  let summary = '';

  if (avgRating >= 4) {
    summary += `Students highly rate this place (${avgRating.toFixed(1)}/5). `;
  } else if (avgRating >= 3) {
    summary += `Students give this place a decent rating (${avgRating.toFixed(1)}/5). `;
  } else {
    summary += `This place has room for improvement (${avgRating.toFixed(1)}/5). `;
  }

  if (positives.length > 0) {
    summary += `Most students appreciate the ${positives.join(', ').toLowerCase()}. `;
  }

  if (negatives.length > 0) {
    summary += `However, some concerns were raised about ${negatives.join(', ').toLowerCase()}. `;
  }

  if (mixed.length > 0) {
    summary += `Opinions are mixed on ${mixed.join(', ').toLowerCase()}.`;
  }

  // Also include tag-based insights
  const tagCounts = {};
  reviews.forEach((r) => {
    (r.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  if (popularTags.length > 0) {
    summary += ` Most frequently mentioned: ${popularTags.join(', ')}.`;
  }

  return summary.trim() || null;
}
