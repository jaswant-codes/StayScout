import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { updateProperty, uploadPropertyImages } from '../hooks/useProperties';
import FacilityTag from '../components/FacilityTag';
import Loader from '../components/Loader';
import { FACILITIES_LIST } from '../utils/helpers';
import { ArrowLeft, Upload, X, Save } from 'lucide-react';

export default function EditProperty() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    city: '',
    area: '',
    rent: '',
    description: '',
    availability: 'available',
  });
  const [facilities, setFacilities] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProperty() {
      try {
        const docSnap = await getDoc(doc(db, 'properties', id));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.ownerId !== user?.uid) {
            navigate('/owner/dashboard');
            return;
          }
          setForm({
            name: data.name || '',
            city: data.city || '',
            area: data.area || '',
            rent: data.rent?.toString() || '',
            description: data.description || '',
            availability: data.availability || 'available',
          });
          setFacilities(data.facilities || []);
          setExistingImages(data.images || []);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id, user?.uid, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleFacility = (f) => {
    setFacilities((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let uploadedUrls = [];
      if (newImageFiles.length > 0) {
        uploadedUrls = await uploadPropertyImages(newImageFiles);
      }

      await updateProperty(id, {
        ...form,
        rent: Number(form.rent),
        facilities,
        images: [...existingImages, ...uploadedUrls],
      });

      navigate('/owner/dashboard');
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to update property.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Loading property..." />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="text-2xl font-bold text-text-primary mb-1">Edit Property</h1>
      <p className="text-sm text-text-secondary mb-8">Update your property details</p>

      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Property Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required className="input-field" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">City *</label>
            <input name="city" value={form.city} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Area *</label>
            <input name="area" value={form.area} onChange={handleChange} required className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Monthly Rent (₹) *</label>
            <input name="rent" type="number" value={form.rent} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Availability</label>
            <select name="availability" value={form.availability} onChange={handleChange} className="input-field">
              <option value="available">Available</option>
              <option value="full">Full</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="input-field resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Facilities</label>
          <div className="flex flex-wrap gap-2">
            {FACILITIES_LIST.map((f) => (
              <FacilityTag
                key={f}
                facility={f}
                selected={facilities.includes(f)}
                onClick={() => toggleFacility(f)}
                small
              />
            ))}
          </div>
        </div>

        {/* Existing Images */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Current Images</label>
          {existingImages.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {existingImages.map((img, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                  <img src={img} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-dark-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">No images</p>
          )}
        </div>

        {/* New Image Upload */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Add More Images</label>
          <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-border hover:border-accent-500/50 bg-dark-700/50 cursor-pointer transition-colors">
            <Upload size={20} className="text-text-muted mb-1" />
            <span className="text-xs text-text-muted">Click to upload</span>
            <input type="file" accept="image/*" multiple onChange={handleNewImages} className="hidden" />
          </label>

          {newImagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
              {newImagePreviews.map((preview, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                  <img src={preview} alt={`New ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-dark-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Save size={16} /> Save Changes</>
            )}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}
