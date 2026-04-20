import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addProperty, uploadPropertyImages } from '../hooks/useProperties';
import FacilityTag from '../components/FacilityTag';
import { FACILITIES_LIST } from '../utils/helpers';
import {
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  Save,
} from 'lucide-react';

export default function AddProperty() {
  const { user, userProfile } = useAuth();
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
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleFacility = (f) => {
    setFacilities((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.city || !form.area || !form.rent) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      let imageUrls = [];
      if (imageFiles.length > 0) {
        imageUrls = await uploadPropertyImages(imageFiles);
      }

      await addProperty({
        ...form,
        rent: Number(form.rent),
        facilities,
        images: imageUrls,
        ownerId: user.uid,
        ownerName: userProfile.name,
      });

      navigate('/owner/dashboard');
    } catch (err) {
      console.error('Error adding property:', err);
      setError(err.message || 'Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="text-2xl font-bold text-text-primary mb-1 animate-fade-in">
        Add New Property
      </h1>
      <p className="text-sm text-text-secondary mb-8 animate-fade-in">
        Fill in the details to list your property
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        {/* Property Name */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Property Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Sunshine Boys PG"
            required
            className="input-field"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              City *
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g., Bangalore"
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Area *
            </label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="e.g., Koramangala"
              required
              className="input-field"
            />
          </div>
        </div>

        {/* Rent + Availability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Monthly Rent (₹) *
            </label>
            <input
              name="rent"
              type="number"
              value={form.rent}
              onChange={handleChange}
              placeholder="e.g., 8000"
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Availability
            </label>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="input-field"
            >
              <option value="available">Available</option>
              <option value="full">Full</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your property, rules, nearby landmarks..."
            rows={5}
            className="input-field resize-none"
          />
        </div>

        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Facilities
          </label>
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

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Property Images
          </label>

          <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-border hover:border-accent-500/50 bg-dark-700/50 cursor-pointer transition-colors">
            <Upload size={24} className="text-text-muted mb-2" />
            <span className="text-sm text-text-muted">Click to upload images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
              {imagePreviews.map((preview, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                  <img
                    src={preview}
                    alt={`Upload ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-dark-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={16} />
                Publish Property
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
