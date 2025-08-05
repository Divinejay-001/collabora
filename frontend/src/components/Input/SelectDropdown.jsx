import React, { useState, useRef, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';

const SelectDropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mt-2" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-sm bg-white dark:bg-gray-800 text-black dark:text-white outline-none border border-slate-200 dark:border-gray-700 px-3 py-2.5 rounded-md flex justify-between items-center shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>
          {value ? options.find((opt) => opt.value === value)?.label : placeholder}
        </span>
        <LuChevronDown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-md shadow-lg"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSelect(option.value);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                option.value === value
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : ''
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
