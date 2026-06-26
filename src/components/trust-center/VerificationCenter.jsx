import React from 'react';
import { Mail, Phone, Fingerprint, MapPin, Briefcase, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

export default function VerificationCenter({ verifications }) {
  const vData = verifications || {
    email: { status: 'verified' },
    phone: { status: 'unverified' },
    govId: { status: 'pending' },
    address: { status: 'unverified' },
    business: { status: 'unverified' }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return {
          badge: 'bg-success/10 text-success border-success/20',
          icon: <ShieldCheck className="w-3.5 h-3.5 mr-1" />,
          label: 'Verified'
        };
      case 'pending':
        return {
          badge: 'bg-warning/10 text-warning border-warning/20',
          icon: <Clock className="w-3.5 h-3.5 mr-1" />,
          label: 'Pending'
        };
      default:
        return {
          badge: 'bg-dark-700 text-text-muted border-dark-600',
          icon: <AlertCircle className="w-3.5 h-3.5 mr-1" />,
          label: 'Unverified'
        };
    }
  };

  const verificationCards = [
    {
      id: 'email',
      title: 'Email Address',
      description: 'Used for account security and notifications.',
      icon: <Mail className="w-5 h-5" />,
      status: vData.email?.status || 'unverified'
    },
    {
      id: 'phone',
      title: 'Phone Number',
      description: 'Allows guests and support to contact you directly.',
      icon: <Phone className="w-5 h-5" />,
      status: vData.phone?.status || 'unverified'
    },
    {
      id: 'govId',
      title: 'Government ID',
      description: 'Verifies your identity for platform safety.',
      icon: <Fingerprint className="w-5 h-5" />,
      status: vData.govId?.status || 'unverified'
    },
    {
      id: 'address',
      title: 'Personal Address',
      description: 'Confirms your permanent residence.',
      icon: <MapPin className="w-5 h-5" />,
      status: vData.address?.status || 'unverified'
    },
    {
      id: 'business',
      title: 'Business Details',
      description: 'Verifies your business registration and tax info.',
      icon: <Briefcase className="w-5 h-5" />,
      status: vData.business?.status || 'unverified'
    }
  ];

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-accent-500" />
          Verification Center
        </h2>
        <p className="text-text-muted mt-1 text-sm">
          Complete verifications to earn the Verified Host badge and build trust with guests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {verificationCards.map((card) => {
          const statusConfig = getStatusConfig(card.status);
          
          return (
            <div key={card.id} className="glass border border-border rounded-xl p-5 flex flex-col h-full transition-all hover:border-dark-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-dark-800 rounded-lg text-accent-400">
                  {card.icon}
                </div>
                <div className={`flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${statusConfig.badge}`}>
                  {statusConfig.icon}
                  {statusConfig.label}
                </div>
              </div>
              
              <h3 className="text-white font-medium mb-1.5">{card.title}</h3>
              <p className="text-text-muted text-sm flex-grow mb-5">{card.description}</p>
              
              {card.status !== 'verified' && (
                <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  card.status === 'pending' 
                    ? 'bg-dark-800 text-text-muted cursor-wait' 
                    : 'btn-secondary'
                }`}
                disabled={card.status === 'pending'}>
                  {card.status === 'pending' ? 'Review in Progress' : 'Verify Now'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
