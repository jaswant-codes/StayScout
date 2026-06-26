import { createContext, useContext, useCallback, useRef } from 'react';

const AnalyticsContext = createContext(null);

const isDev = import.meta.env.DEV;

function createTracker() {
  const events = [];

  function pushEvent(event) {
    const entry = { ...event, timestamp: new Date().toISOString() };
    events.push(entry);
    if (isDev) {
      console.log('[Analytics]', entry);
    }
  }

  function trackPageView(pageName) {
    pushEvent({ type: 'page_view', pageName });
  }

  function trackPropertyView(propertyId, propertyName) {
    pushEvent({ type: 'property_view', propertyId, propertyName });
  }

  function trackSearch(query, filters) {
    pushEvent({ type: 'search', query, filters });
  }

  function trackListingClick(propertyId, propertyName) {
    pushEvent({ type: 'listing_click', propertyId, propertyName });
  }

  function trackEvent(category, action, label, value) {
    pushEvent({ type: 'custom', category, action, label, value });
  }

  function getEvents() {
    return [...events];
  }

  return { trackPageView, trackPropertyView, trackSearch, trackListingClick, trackEvent, getEvents };
}

export function AnalyticsProvider({ children }) {
  const trackerRef = useRef(null);
  if (!trackerRef.current) {
    trackerRef.current = createTracker();
  }

  return (
    <AnalyticsContext.Provider value={trackerRef.current}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return ctx;
}
