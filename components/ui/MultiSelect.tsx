import React, { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: { id: string; name: string }[];
  disabled?: boolean;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  onChange,
  options,
  disabled,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((v) => v !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="block cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="form-multiselect block w-full py-2 pl-3 pr-10 text-base leading-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:leading-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400">
          {value.length ? value.join(', ') : placeholder}
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 dark:bg-gray-800">
          <ul className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm sm:leading-5">
            {options.map((option) => (
              <li
                key={option.id}
                className="cursor-default select-none relative py-2 pl-3 pr-9 dark:hover:bg-gray-700 dark:text-white"
                onClick={() => handleSelect(option.name)}
              >
                <span
                  className={`${
                    value.includes(option.name) ? 'font-semibold' : 'font-normal'
                  } block truncate`}
                >
                  {option.name}
                </span>
                {value.includes(option.name) && (
                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4 dark:text-indigo-400">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
