import { MapPin } from 'lucide-react';

function MapPicker({ updateForm }) {
  const handleFakeMapClick = () => {
    // Fakes setting lat/lng
    updateForm({ lat: 28.7041, lng: 77.1025 });
  };

  return (
    <div 
      className="relative w-full h-48 bg-dark-700 border border-border rounded-xl mt-2 overflow-hidden cursor-pointer group flex items-center justify-center"
      onClick={handleFakeMapClick}
    >
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] background-repeat"></div>
      <div className="z-10 flex flex-col items-center text-center p-4">
        <MapPin className="w-8 h-8 text-accent-500 mb-2 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          Click to drop a pin on the map
        </span>
      </div>
    </div>
  );
}

export default function StepLocation({ form, updateForm }) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto p-4 sm:p-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Location Details</h2>
        <p className="text-gray-400 text-sm">Help tenants find your property easily.</p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Country
            </label>
            <input
              type="text"
              className="input-field w-full"
              placeholder="India"
              value={form.country || ''}
              onChange={(e) => updateForm({ country: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              State
            </label>
            <input
              type="text"
              className="input-field w-full"
              placeholder="State"
              value={form.state || ''}
              onChange={(e) => updateForm({ state: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              City
            </label>
            <input
              type="text"
              className="input-field w-full"
              placeholder="City"
              value={form.city || ''}
              onChange={(e) => updateForm({ city: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Locality/Area
            </label>
            <input
              type="text"
              className="input-field w-full"
              placeholder="e.g. Kormangala, Andheri"
              value={form.locality || ''}
              onChange={(e) => updateForm({ locality: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              PIN Code
            </label>
            <input
              type="text"
              className="input-field w-full"
              placeholder="ZIP/PIN"
              value={form.pincode || ''}
              onChange={(e) => updateForm({ pincode: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Address
          </label>
          <textarea
            className="input-field w-full min-h-[80px] resize-y"
            placeholder="House/Flat No., Street Name, Landmark"
            value={form.address || ''}
            onChange={(e) => updateForm({ address: e.target.value })}
          ></textarea>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-300">
              Pin on Map
            </label>
            {form.lat && form.lng && (
              <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded">
                Location Selected
              </span>
            )}
          </div>
          <MapPicker updateForm={updateForm} />
        </div>
      </div>
    </div>
  );
}
