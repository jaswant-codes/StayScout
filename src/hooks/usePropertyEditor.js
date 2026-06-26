import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, firebaseInitialized } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { mockProperties } from '../hooks/useProperties';

export function usePropertyEditor(propertyId) {
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, media, pricing, rooms, rules, settings

  // Unsaved changes tracking (section level)
  const [dirtySections, setDirtySections] = useState(new Set());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      try {
        if (!firebaseInitialized || !db) {
          const fakeProp = mockProperties.find(p => p.id === propertyId);
          if (fakeProp) {
            setProperty(fakeProp);
          }
        } else {
          const docSnap = await getDoc(doc(db, 'properties', propertyId));
          if (docSnap.exists()) {
            setProperty({ id: docSnap.id, ...docSnap.data() });
          }
        }
      } catch (err) {
        console.error('Failed to load property editor', err);
      } finally {
        setLoading(false);
      }
    }
    if (propertyId) loadProperty();
  }, [propertyId]);

  const togglePreview = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  const markSectionDirty = useCallback((sectionId) => {
    setDirtySections(prev => {
      const next = new Set(prev);
      next.add(sectionId);
      return next;
    });
  }, []);

  const markSectionClean = useCallback((sectionId) => {
    setDirtySections(prev => {
      const next = new Set(prev);
      next.delete(sectionId);
      return next;
    });
  }, []);

  const saveSection = useCallback(async (sectionId, updates) => {
    setIsSaving(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    setProperty(prev => ({ ...prev, ...updates }));
    markSectionClean(sectionId);
    setIsSaving(false);
  }, [markSectionClean]);

  return {
    property,
    loading,
    isPreviewMode,
    togglePreview,
    activeTab,
    setActiveTab,
    dirtySections,
    markSectionDirty,
    saveSection,
    isSaving
  };
}
