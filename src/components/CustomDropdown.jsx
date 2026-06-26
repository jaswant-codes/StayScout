import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  icon: Icon, 
  placeholder = "Select Option",
  className = "",
  name
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(options.findIndex(opt => !opt.disabled && !opt.divider));
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => {
          let next = prev + 1;
          while (next < options.length && (options[next].disabled || options[next].divider)) next++;
          return next < options.length ? next : prev;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          let next = prev - 1;
          while (next >= 0 && (options[next].disabled || options[next].divider)) next--;
          return next >= 0 ? next : prev;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length && !options[focusedIndex].disabled && !options[focusedIndex].divider) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[focusedIndex];
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div 
      className={`relative ${className} focus-within:ring-2 focus-within:ring-accent-500 rounded-xl transition-shadow`} 
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      <input type="hidden" name={name} value={value || ''} />

      <button
        type="button"
        className="w-full h-full bg-transparent border-none focus:outline-none flex items-center justify-between text-left group"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 w-full">
          {Icon && <Icon size={20} className="text-text-muted transition-colors group-hover:text-accent-400 group-focus-visible:text-accent-400 ml-4 absolute left-0" />}
          <span className={`block truncate pl-12 pr-10 w-full ${!selectedOption || selectedOption.disabled ? 'text-text-secondary' : 'text-text-primary'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`absolute right-4 text-text-muted transition-transform duration-300 pointer-events-none ${isOpen ? 'rotate-180 text-accent-400' : ''}`} 
        />
      </button>

      <div 
        className={`absolute z-50 w-full mt-2 bg-[#1a1d27] border border-border rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-200 origin-top ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul 
          ref={listRef}
          className="max-h-64 overflow-y-auto py-2 custom-scrollbar outline-none"
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => {
            if (option.divider) {
              return <div key={`div-${index}`} className="h-px bg-border my-2 mx-3" />;
            }
            
            const isSelected = value === option.value;
            const isFocused = focusedIndex === index;
            
            return (
              <li
                key={option.value || index}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => {
                  if (!option.disabled) {
                    onChange(option.value);
                    setIsOpen(false);
                  }
                }}
                onMouseEnter={() => {
                  if (!option.disabled) setFocusedIndex(index);
                }}
                className={`
                  flex items-center justify-between px-4 py-2.5 mx-2 rounded-lg cursor-pointer transition-colors text-sm
                  ${option.disabled ? 'text-text-muted cursor-default font-medium' : 'text-text-primary hover:bg-dark-700'}
                  ${isSelected && !option.disabled ? 'bg-accent-500/15 text-accent-400 font-medium' : ''}
                  ${isFocused && !option.disabled ? 'bg-dark-700 text-text-primary' : ''}
                `}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && !option.disabled && <Check size={14} className="text-accent-400 flex-shrink-0 ml-2" />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
