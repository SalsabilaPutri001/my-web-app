/**
 * Dashboard Store - Main Zustand store for dashboard state
 */
import { create } from 'zustand';
import { generateAllDashboardData, REGIONS, PRODUCT_CATEGORIES, CUSTOMER_SEGMENTS } from '../mock/data';

// Initialize data once (only generated on client via refreshData/initData)
let cachedData = null;

function getDashboardData() {
  if (!cachedData) {
    cachedData = generateAllDashboardData();
  }
  return cachedData;
}

const EMPTY_PLACEHOLDER = {
  kpis: {
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProfit: 0,
    avgOrderValue: 0,
    profitMargin: 0,
    revenueGrowth: 0,
  },
  dailySales: [],
  topProducts: [],
  topCustomers: [],
  productCategoryDistribution: [],
  regionalSales: [],
};

export const useDashboardStore = create((set, get) => ({
  // Data state
  data: EMPTY_PLACEHOLDER,
  isLoading: false,
  error: null,

  // Filter state
  dateRange: {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  },
  selectedRegions: [],
  selectedCategories: [],
  selectedSegments: [],

  // UI state
  sidebarOpen: true,
  darkMode: false,

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,

  // Search state
  searchQuery: '',

  // Actions
  setDateRange: (from, to) =>
    set({
      dateRange: { from, to },
    }),

  addRegionFilter: (region) =>
    set((state) => ({
      selectedRegions: [...state.selectedRegions, region],
    })),

  removeRegionFilter: (region) =>
    set((state) => ({
      selectedRegions: state.selectedRegions.filter((r) => r !== region),
    })),

  clearRegionFilters: () =>
    set({
      selectedRegions: [],
    }),

  addCategoryFilter: (category) =>
    set((state) => ({
      selectedCategories: [...state.selectedCategories, category],
    })),

  removeCategoryFilter: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.filter((c) => c !== category),
    })),

  clearCategoryFilters: () =>
    set({
      selectedCategories: [],
    }),

  addSegmentFilter: (segment) =>
    set((state) => ({
      selectedSegments: [...state.selectedSegments, segment],
    })),

  removeSegmentFilter: (segment) =>
    set((state) => ({
      selectedSegments: state.selectedSegments.filter((s) => s !== segment),
    })),

  clearSegmentFilters: () =>
    set({
      selectedSegments: [],
    }),

  clearAllFilters: () =>
    set({
      selectedRegions: [],
      selectedCategories: [],
      selectedSegments: [],
      searchQuery: '',
    }),

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),

  toggleDarkMode: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),

  setPage: (page) =>
    set({
      currentPage: page,
    }),

  setItemsPerPage: (items) =>
    set({
      itemsPerPage: items,
    }),

  setSearchQuery: (query) =>
    set({
      searchQuery: query,
    }),

  refreshData: () => {
    set({ isLoading: true });
    // Generate mock data on the client (or when explicitly called)
    setTimeout(() => {
      cachedData = getDashboardData();
      set({ data: cachedData, isLoading: false });
    }, 200);
  },
  // Convenience init that forces fresh generation
  initData: () => {
    set({ isLoading: true });
    setTimeout(() => {
      cachedData = generateAllDashboardData();
      set({ data: cachedData, isLoading: false });
    }, 200);
  },
}));

/**
 * Get filtered data based on current filters
 */
export function getFilteredData(data, state) {
  const { selectedRegions, selectedCategories, selectedSegments, dateRange } = state;

  // Filter by date range
  let filtered = data.filter((item) => {
    if (!item.date) return true;
    const itemDate = new Date(item.date);
    return itemDate >= dateRange.from && itemDate <= dateRange.to;
  });

  // Filter by regions
  if (selectedRegions.length > 0) {
    filtered = filtered.filter((item) => selectedRegions.includes(item.region));
  }

  // Filter by categories
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((item) => selectedCategories.includes(item.category));
  }

  // Filter by segments
  if (selectedSegments.length > 0) {
    filtered = filtered.filter((item) => selectedSegments.includes(item.segment));
  }

  return filtered;
}
