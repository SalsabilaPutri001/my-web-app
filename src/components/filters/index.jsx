'use client';

import { useState } from 'react';
import { Card, Button, Drawer } from '@/components/shared/index';

/**
 * Date Range Picker Component
 */
export function DateRangePicker({
  from,
  to,
  onChange,
}) {
  const handleFromChange = (e) => {
    const newDate = new Date(e.target.value);
    onChange(newDate, to);
  };

  const handleToChange = (e) => {
    const newDate = new Date(e.target.value);
    onChange(from, newDate);
  };

  const formatDateInput = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
        <input
          type="date"
          value={formatDateInput(from)}
          onChange={handleFromChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
        <input
          type="date"
          value={formatDateInput(to)}
          onChange={handleToChange}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

/**
 * Multi-Select Filter Component
 */
export function MultiSelectFilter({
  label,
  options = [],
  selected = [],
  onChange,
  placeholder = 'Select items...',
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selected.length > 0 ? `${selected.length} selected` : placeholder}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-200 last:border-b-0"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Advanced Filters Component (Drawer)
 */
export function AdvancedFilters({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  regions = [],
  categories = [],
  segments = [],
}) {
  const handleRegionToggle = (region) => {
    if (filters.regions.includes(region)) {
      onFiltersChange({
        ...filters,
        regions: filters.regions.filter((r) => r !== region),
      });
    } else {
      onFiltersChange({
        ...filters,
        regions: [...filters.regions, region],
      });
    }
  };

  const handleCategoryToggle = (category) => {
    if (filters.categories.includes(category)) {
      onFiltersChange({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      });
    } else {
      onFiltersChange({
        ...filters,
        categories: [...filters.categories, category],
      });
    }
  };

  const handleSegmentToggle = (segment) => {
    if (filters.segments.includes(segment)) {
      onFiltersChange({
        ...filters,
        segments: filters.segments.filter((s) => s !== segment),
      });
    } else {
      onFiltersChange({
        ...filters,
        segments: [...filters.segments, segment],
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Advanced Filters">
      <div className="space-y-6 p-6">
        {/* Regions Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Regions</h4>
          <div className="space-y-2">
            {regions.map((region) => (
              <label key={region} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.regions.includes(region)}
                  onChange={() => handleRegionToggle(region)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">{region}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Segments Filter */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Customer Segments</h4>
          <div className="space-y-2">
            {segments.map((segment) => (
              <label key={segment} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.segments.includes(segment)}
                  onChange={() => handleSegmentToggle(segment)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">{segment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="secondary"
          onClick={() =>
            onFiltersChange({
              regions: [],
              categories: [],
              segments: [],
            })
          }
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </Drawer>
  );
}

/**
 * Search Bar Component
 */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  onSubmit,
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {onSubmit && (
        <Button onClick={() => onSubmit(value)}>Search</Button>
      )}
    </div>
  );
}

/**
 * Quick Filters Component
 */
export function QuickFilters({
  filters,
  onFilterChange,
}) {
  const filterOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filterOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            filters === option.id
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
