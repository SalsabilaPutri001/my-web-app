/**
 * Utility functions for formatting and data processing
 */

/**
 * Format currency values
 */
export function formatCurrency(value, currency = 'IDR') {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

/**
 * Format currency with full decimal places
 */
export function formatCurrencyFull(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercentage(value, decimals = 1) {
  return `${(value || 0).toFixed(decimals)}%`;
}

/**
 * Format large numbers with commas
 */
export function formatNumber(value) {
  return Math.round(value || 0).toLocaleString('id-ID');
}

/**
 * Format date to readable format
 */
export function formatDate(date, format = 'short') {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (format === 'short') {
    return date.toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric',
    });
  }

  if (format === 'long') {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return date.toISOString().split('T')[0];
}

/**
 * Format date range
 */
export function formatDateRange(from, to) {
  const fromStr = formatDate(from, 'short');
  const toStr = formatDate(to, 'short');
  return `${fromStr} - ${toStr}`;
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text, length = 30) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Calculate growth indicator (up/down/neutral)
 */
export function getGrowthIndicator(value) {
  if (value > 0) return { direction: 'up', color: 'text-green-600' };
  if (value < 0) return { direction: 'down', color: 'text-red-600' };
  return { direction: 'neutral', color: 'text-gray-600' };
}

/**
 * Sort array by property
 */
export function sortBy(array, property, order = 'asc') {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];

    if (order === 'desc') {
      return bVal - aVal;
    }
    return aVal - bVal;
  });
}

/**
 * Filter array by search query on multiple properties
 */
export function filterBySearch(array, query, properties = []) {
  if (!query) return array;

  const lowerQuery = query.toLowerCase();
  return array.filter((item) =>
    properties.some((prop) =>
      String(item[prop]).toLowerCase().includes(lowerQuery)
    )
  );
}

/**
 * Paginate array
 */
export function paginate(array, page = 1, itemsPerPage = 10) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
}

/**
 * Get pagination info
 */
export function getPaginationInfo(array, page = 1, itemsPerPage = 10) {
  const totalPages = Math.ceil(array.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, array.length);

  return {
    totalPages,
    currentPage: page,
    startIndex,
    endIndex,
    totalItems: array.length,
  };
}

/**
 * Generate color based on value (for charts)
 */
export function getColorByValue(value, positive = true) {
  if (positive) {
    if (value > 0) return '#10b981'; // green
    if (value < 0) return '#ef4444'; // red
    return '#6b7280'; // gray
  } else {
    if (value < 0) return '#10b981'; // green (lower is better)
    if (value > 0) return '#ef4444'; // red
    return '#6b7280'; // gray
  }
}

/**
 * Calculate average
 */
export function calculateAverage(array, property) {
  if (array.length === 0) return 0;
  const sum = array.reduce((acc, item) => acc + (item[property] || 0), 0);
  return sum / array.length;
}

/**
 * Calculate sum
 */
export function calculateSum(array, property) {
  return array.reduce((acc, item) => acc + (item[property] || 0), 0);
}

/**
 * Get top N items
 */
export function getTopItems(array, n = 5, property = 'revenue') {
  return sortBy(array, property, 'desc').slice(0, n);
}

/**
 * Delay function for simulating API calls
 */
export function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate chart colors
 */
export const CHART_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
];

/**
 * Get color from palette
 */
export function getChartColor(index) {
  return CHART_COLORS[index % CHART_COLORS.length];
}

/**
 * Combine class names conditionally
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
