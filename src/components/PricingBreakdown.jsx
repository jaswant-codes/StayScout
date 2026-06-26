export default function PricingBreakdown({ property }) {
  if (!property) return null;

  const rent = property.rent || 0;
  const deposit = property.deposit || 0;
  const maintenance = property.maintenance || 0;
  const brokerage = property.brokerage || 0;
  
  const electricity = property.electricity || 'As per usage';
  const water = property.water || 'Included';
  const refundable = property.refundableDeposit || deposit;

  const totalMoveIn = rent + deposit + maintenance + brokerage;

  return (
    <div className="bg-dark-800 rounded-3xl p-6 sm:p-8 border border-border">
      <h3 className="text-xl font-bold text-white mb-6">Pricing Breakdown</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-text-secondary">
          <span>Monthly Rent</span>
          <span className="font-medium text-white">₹{rent.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center text-text-secondary">
          <span>Security Deposit</span>
          <span className="font-medium text-white">₹{deposit.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center text-text-secondary">
          <span>Maintenance Charges</span>
          <span className="font-medium text-white">
            {maintenance === 0 ? 'Included' : `₹${maintenance.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-text-secondary">
          <span>Brokerage</span>
          <span className="font-medium text-white">
            {brokerage === 0 ? 'No Brokerage' : `₹${brokerage.toLocaleString()}`}
          </span>
        </div>

        <div className="flex justify-between items-center text-text-secondary">
          <span>Electricity Charges</span>
          <span className="font-medium text-white">{electricity}</span>
        </div>

        <div className="flex justify-between items-center text-text-secondary">
          <span>Water Charges</span>
          <span className="font-medium text-white">{water}</span>
        </div>

        <div className="flex justify-between items-center text-text-secondary border-t border-border pt-4 mt-4">
          <span>Refundable Amount (on move out)</span>
          <span className="font-medium text-success">₹{refundable.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center bg-dark-700 p-4 rounded-xl mt-6 border border-border">
          <span className="font-bold text-white">Total Move-in Cost</span>
          <span className="font-bold text-xl text-accent-500">₹{totalMoveIn.toLocaleString()}</span>
        </div>
      </div>
      
      <p className="text-xs text-text-muted mt-4 text-center">
        * No hidden charges. StayScout guarantees transparency.
      </p>
    </div>
  );
}
