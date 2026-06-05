/**
 * TypeScript Type Definitions for Dashboard
 * Used as JSDoc comments for JavaScript
 */

/**
 * @typedef {Object} KPIMetrics
 * @property {number} totalRevenue - Total revenue
 * @property {number} totalOrders - Total orders
 * @property {number} totalCustomers - Total customers
 * @property {number} totalProfit - Total profit
 * @property {number} avgOrderValue - Average order value
 * @property {number} revenueGrowth - Revenue growth percentage
 * @property {number} profitMargin - Profit margin percentage
 */

/**
 * @typedef {Object} DailySalesData
 * @property {string} date - Date in YYYY-MM-DD format
 * @property {number} revenue - Daily revenue
 * @property {number} orders - Daily orders
 * @property {number} customers - Daily customers
 * @property {number} profit - Daily profit
 */

/**
 * @typedef {Object} ProductData
 * @property {number} id - Product ID
 * @property {string} name - Product name
 * @property {string} category - Product category
 * @property {number} revenue - Product revenue
 * @property {number} units - Units sold
 * @property {number} growth - Growth percentage
 * @property {number} profit - Product profit
 */

/**
 * @typedef {Object} CustomerData
 * @property {number} id - Customer ID
 * @property {string} name - Customer name
 * @property {string} email - Customer email
 * @property {string} segment - Customer segment
 * @property {number} revenue - Customer revenue
 * @property {number} orders - Customer orders
 * @property {string} lastPurchase - Last purchase date
 */

/**
 * @typedef {Object} RegionalData
 * @property {string} region - Region name
 * @property {number} revenue - Regional revenue
 * @property {number} orders - Regional orders
 * @property {number} profit - Regional profit
 * @property {number} growth - Growth percentage
 */

/**
 * @typedef {Object} DateRange
 * @property {Date} from - Start date
 * @property {Date} to - End date
 */

/**
 * @typedef {Object} DashboardState
 * @property {Array} data - Dashboard data
 * @property {boolean} isLoading - Loading state
 * @property {string|null} error - Error message
 * @property {DateRange} dateRange - Selected date range
 * @property {Array<string>} selectedRegions - Selected regions
 * @property {Array<string>} selectedCategories - Selected categories
 * @property {Array<string>} selectedSegments - Selected segments
 * @property {boolean} sidebarOpen - Sidebar visibility
 * @property {boolean} darkMode - Dark mode toggle
 * @property {number} currentPage - Current page for pagination
 * @property {number} itemsPerPage - Items per page
 * @property {string} searchQuery - Search query
 */

export {};
