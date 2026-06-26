import { useState } from 'react';
import { Phone, Mail, MessageSquare, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ContactOwnerCard({ property, isVerified = true, onScheduleVisit }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPhone, setShowPhone] = useState(false);

  const handleContact = (type) => {
    if (!user) {
      // Need to login first
      navigate('/login?redirect=property');
      return;
    }

    if (type === 'phone') {
      setShowPhone(true);
    } else if (type === 'message') {
      navigate(`/inbox?owner=${property.ownerId}`);
    }
  };

  return (
    <div className="bg-dark-800 rounded-3xl p-6 border border-border sticky top-24">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-dark-700 overflow-hidden shrink-0 border-2 border-dark-600">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${property.ownerId}`} 
            alt="Owner Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Property Manager</h3>
          <p className="text-sm text-text-secondary mb-1">StayScout Partner</p>
          {isVerified && (
            <div className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full inline-flex">
              <ShieldCheck size={12} /> Identity Verified
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <CheckCircle2 size={16} className="text-text-muted" /> Usually responds within 1 hour
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <CheckCircle2 size={16} className="text-text-muted" /> Speaks English, Hindi
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => handleContact('phone')}
          className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 font-bold"
        >
          <Phone size={18} />
          {showPhone ? '+91 98765 43210' : 'Show Phone Number'}
        </button>
        
        <button 
          onClick={() => handleContact('message')}
          className="w-full btn-secondary py-3.5 flex items-center justify-center gap-2 font-bold"
        >
          <MessageSquare size={18} />
          Send a Message
        </button>

        <button 
          onClick={onScheduleVisit}
          className="w-full btn-outline py-3.5 flex items-center justify-center gap-2 font-bold bg-dark-800 text-white border-border hover:bg-dark-700"
        >
          <Calendar size={18} />
          Schedule a Visit
        </button>
      </div>
      
      <p className="text-xs text-text-muted text-center mt-4 px-2">
        To protect your payment, never transfer money or communicate outside of the StayScout website.
      </p>
    </div>
  );
}
