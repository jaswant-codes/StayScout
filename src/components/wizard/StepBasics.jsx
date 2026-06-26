export default function StepBasics({ form, updateForm }) {
  const handleSummaryChange = (e) => {
    updateForm({ summary: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    updateForm({ description: e.target.value });
  };

  const maxSummary = 150;
  const maxDesc = 1000;

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto p-4 sm:p-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Basic Details</h2>
        <p className="text-gray-400 text-sm">Start by providing the fundamental details about your property.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Property Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className="input-field w-full"
            placeholder="e.g. Sunrise Hostel, Elite PG"
            value={form.name || ''}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Property Type <span className="text-error">*</span>
            </label>
            <select
              className="input-field w-full appearance-none bg-dark-700"
              value={form.type || ''}
              onChange={(e) => updateForm({ type: e.target.value })}
            >
              <option value="" disabled>Select Type</option>
              <option value="pg">PG</option>
              <option value="hostel">Hostel</option>
              <option value="apartment">Apartment</option>
              <option value="room">Independent Room</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tenant Preference <span className="text-error">*</span>
            </label>
            <select
              className="input-field w-full appearance-none bg-dark-700"
              value={form.preference || ''}
              onChange={(e) => updateForm({ preference: e.target.value })}
            >
              <option value="" disabled>Select Preference</option>
              <option value="boys">Boys Only</option>
              <option value="girls">Girls Only</option>
              <option value="any">Any / Co-ed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Short Summary <span className="text-error">*</span>
          </label>
          <input
            type="text"
            className="input-field w-full"
            placeholder="A catchy one-liner for your property"
            value={form.summary || ''}
            onChange={handleSummaryChange}
            maxLength={maxSummary}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">
              {(form.summary || '').length} / {maxSummary}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Detailed Description
          </label>
          <textarea
            className="input-field w-full min-h-[120px] resize-y"
            placeholder="Describe the amenities, rules, and vibe of your property..."
            value={form.description || ''}
            onChange={handleDescriptionChange}
            maxLength={maxDesc}
          ></textarea>
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">
              {(form.description || '').length} / {maxDesc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
