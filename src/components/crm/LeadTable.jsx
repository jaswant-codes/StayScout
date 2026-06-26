import React from 'react';

const LeadTable = ({ leads, setActiveLeadId }) => {
  const getStatusBadge = (status) => {
    return (
      <span className="px-2 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider bg-dark-700 text-text-primary border border-border">
        {status}
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-dark-800">
      <table className="w-full text-left text-sm text-text-secondary whitespace-nowrap">
        <thead className="text-xs uppercase bg-dark-900/50 text-text-muted border-b border-border">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Name</th>
            <th scope="col" className="px-6 py-4 font-medium">Property</th>
            <th scope="col" className="px-6 py-4 font-medium">Budget</th>
            <th scope="col" className="px-6 py-4 font-medium">Status</th>
            <th scope="col" className="px-6 py-4 font-medium">Move-in Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-text-muted">
                No leads found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr 
                key={lead.id} 
                onClick={() => setActiveLeadId && setActiveLeadId(lead.id)}
                className="hover:bg-dark-700/50 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-white group-hover:text-accent-400 transition-colors">
                  {lead.name}
                </td>
                <td className="px-6 py-4 text-text-primary">
                  {lead.propertyName || '-'}
                </td>
                <td className="px-6 py-4 text-text-primary font-medium">
                  {lead.budget ? `$${lead.budget.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(lead.status)}
                </td>
                <td className="px-6 py-4 text-text-muted">
                  {lead.moveInDate || '-'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
