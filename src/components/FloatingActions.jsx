import { useState, useRef, useEffect } from 'react';
import { MessageCircle, HelpCircle, Lightbulb, LifeBuoy, X, Phone, AlertTriangle } from 'lucide-react';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" ref={menuRef}>
      {/* Support Menu Items */}
      <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4 pointer-events-none'}`}>
        <button 
          className="flex items-center justify-end gap-3 group"
          title="WhatsApp Support"
        >
          <span className="px-3 py-1.5 rounded-lg bg-dark-800 text-text-primary text-sm font-medium border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp Support</span>
          <div className="glass p-3 rounded-full text-text-secondary hover:text-green-400 hover:border-green-400/30 transition-all shadow-lg hover:shadow-green-400/10">
            <MessageCircle size={20} />
          </div>
        </button>

        <button 
          className="flex items-center justify-end gap-3 group"
          title="Help Center"
        >
          <span className="px-3 py-1.5 rounded-lg bg-dark-800 text-text-primary text-sm font-medium border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">Help Center</span>
          <div className="glass p-3 rounded-full text-text-secondary hover:text-accent-400 hover:border-accent-400/30 transition-all shadow-lg hover:shadow-accent-400/10">
            <HelpCircle size={20} />
          </div>
        </button>

        <button 
          className="flex items-center justify-end gap-3 group"
          title="Contact Us"
        >
          <span className="px-3 py-1.5 rounded-lg bg-dark-800 text-text-primary text-sm font-medium border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">Contact Us</span>
          <div className="glass p-3 rounded-full text-text-secondary hover:text-blue-400 hover:border-blue-400/30 transition-all shadow-lg hover:shadow-blue-400/10">
            <Phone size={20} />
          </div>
        </button>

        <button 
          className="flex items-center justify-end gap-3 group"
          title="Report Issue"
        >
          <span className="px-3 py-1.5 rounded-lg bg-dark-800 text-text-primary text-sm font-medium border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">Report Issue</span>
          <div className="glass p-3 rounded-full text-text-secondary hover:text-error hover:border-error/30 transition-all shadow-lg hover:shadow-error/10">
            <AlertTriangle size={20} />
          </div>
        </button>

        <button 
          className="flex items-center justify-end gap-3 group"
          title="Feedback"
        >
          <span className="px-3 py-1.5 rounded-lg bg-dark-800 text-text-primary text-sm font-medium border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">Feedback</span>
          <div className="glass p-3 rounded-full text-text-secondary hover:text-yellow-400 hover:border-yellow-400/30 transition-all shadow-lg hover:shadow-yellow-400/10">
            <Lightbulb size={20} />
          </div>
        </button>
      </div>

      {/* Main Support Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-4 rounded-full text-white bg-accent-600/80 hover:bg-accent-600 transition-all duration-300 shadow-xl hover:shadow-accent-500/20 hover:-translate-y-1"
        title="Support"
        aria-label="Support Menu"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? <X size={24} /> : <LifeBuoy size={24} />}
        </div>
      </button>
    </div>
  );
}
