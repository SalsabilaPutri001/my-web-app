/**
 * Mock Data Generators for Sales Analytics Dashboard
 * Generates realistic test data for all dashboard features
 */

// Product categories
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Food & Beverage',
  'Beauty & Personal Care',
];

// Regions in Indonesia
export const REGIONS = [
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Sumatera Utara',
  'Sumatera Selatan',
  'Kalimantan Barat',
  'Kalimantan Timur',
  'Sulawesi Utara',
  'Sulawesi Selatan',
  'Papua',
];

// Cities
export const CITIES = [
  'Jakarta',
  'Surabaya',
  'Bandung',
  'Medan',
  'Semarang',
  'Makassar',
  'Depok',
  'Tangerang',
  'Bekasi',
  'Bogor',
];

// Customer segments
export const CUSTOMER_SEGMENTS = [
  'Premium',
  'Mid-Market',
  'SME',
  'Startup',
  'Enterprise',
];

// Products
export const PRODUCTS = [
  { id: 1, name: 'Laptop Pro 15"', category: 'Electronics', price: 15000000 },
  { id: 2, name: 'Wireless Headphones', category: 'Electronics', price: 2500000 },
  { id: 3, name: 'Smart Watch', category: 'Electronics', price: 3500000 },
  { id: 4, name: 'Designer Jeans', category: 'Fashion', price: 750000 },
  { id: 5, name: 'Premium T-Shirt', category: 'Fashion', price: 350000 },
  { id: 6, name: 'Leather Jacket', category: 'Fashion', price: 2500000 },
  { id: 7, name: 'Office Chair', category: 'Home & Garden', price: 3000000 },
  { id: 8, name: 'Standing Desk', category: 'Home & Garden', price: 5000000 },
  { id: 9, name: 'Yoga Mat', category: 'Sports', price: 250000 },
  { id: 10, name: 'Running Shoes', category: 'Sports', price: 1200000 },
  { id: 11, name: 'Organic Coffee', category: 'Food & Beverage', price: 150000 },
  { id: 12, name: 'Face Cream', category: 'Beauty & Personal Care', price: 350000 },
];

/**
 * Generate daily sales data for the last N days
 */
export function generateDailySalesData(days = 30) {
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const baseRevenue = 50000000 + Math.random() * 100000000;
    const trend = (days - i) / days; // Upward trend
    const seasonal = Math.sin((i / 7) * Math.PI) * 0.3; // Weekly pattern

    data.push({
      date: date.toISOString().split('T')[0],
      dateObj: date,
      revenue: Math.round(baseRevenue * (1 + trend * 0.2 + seasonal)),
      orders: Math.round(100 + Math.random() * 150 + trend * 30),
      customers: Math.round(40 + Math.random() * 80 + trend * 15),
      profit: Math.round(baseRevenue * 0.35 * (1 + trend * 0.2 + seasonal)),
    });
  }

  return data;
}

/**
 * Generate monthly sales data
 */
export function generateMonthlySalesData() {
  const data = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    const monthIndex = date.getMonth();
    const baseRevenue = 1200000000 + Math.random() * 800000000;
    const seasonal =
      Math.sin((monthIndex / 12) * Math.PI * 2) * 0.4 + // Yearly seasonality
      (monthIndex === 11 || monthIndex === 0 ? 0.3 : 0); // December/January boost

    data.push({
      month: date.toLocaleString('en-US', { month: 'short', year: '2-digit' }),
      revenue: Math.round(baseRevenue * (1 + seasonal)),
      target: Math.round(baseRevenue * 1.2),
      actual: Math.round(baseRevenue * (1 + seasonal)),
      profit: Math.round(baseRevenue * 0.35 * (1 + seasonal)),
    });
  }

  return data;
}

/**
 * Generate product category distribution
 */
export function generateProductCategoryData() {
  return PRODUCT_CATEGORIES.map((category) => ({
    name: category,
    value: Math.round(Math.random() * 100000000 + 20000000),
    percentage: Math.round(Math.random() * 40 + 10),
  })).sort((a, b) => b.value - a.value);
}

/**
 * Generate top products data
 */
export function generateTopProductsData() {
  return PRODUCTS.slice(0, 8)
    .map((product) => ({
      ...product,
      revenue: Math.round(Math.random() * 500000000 + 50000000),
      units: Math.round(Math.random() * 1000 + 100),
      growth: Math.round((Math.random() - 0.3) * 100),
      profit: Math.round(Math.random() * 200000000 + 20000000),
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

/**
 * Generate top customers data
 */
export function generateTopCustomersData() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    segment: CUSTOMER_SEGMENTS[Math.floor(Math.random() * CUSTOMER_SEGMENTS.length)],
    revenue: Math.round(Math.random() * 5000000 + 500000),
    orders: Math.floor(Math.random() * 50 + 5),
    lastPurchase: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  })).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Generate regional sales data
 */
export function generateRegionalSalesData() {
  return REGIONS.map((region) => ({
    region,
    revenue: Math.round(Math.random() * 500000000 + 100000000),
    orders: Math.floor(Math.random() * 500 + 100),
    profit: Math.round(Math.random() * 200000000 + 30000000),
    growth: Math.round((Math.random() - 0.3) * 100),
  })).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Generate city-level sales data
 */
export function generateCitySalesData() {
  return CITIES.map((city) => ({
    city,
    revenue: Math.round(Math.random() * 300000000 + 50000000),
    orders: Math.floor(Math.random() * 300 + 50),
    profit: Math.round(Math.random() * 150000000 + 20000000),
  })).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Generate customer demographic data
 */
export function generateCustomerDemographicsData() {
  return CUSTOMER_SEGMENTS.map((segment) => ({
    segment,
    new: Math.floor(Math.random() * 500 + 50),
    returning: Math.floor(Math.random() * 2000 + 200),
    churnRate: Math.round(Math.random() * 30),
  }));
}

/**
 * Generate customer growth trend
 */
export function generateCustomerGrowthTrend(months = 12) {
  const data = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    data.push({
      month: date.toLocaleString('en-US', { month: 'short' }),
      total: Math.round(15000 + i * 500 + Math.random() * 2000),
      new: Math.round(200 + Math.random() * 300),
      returning: Math.round(800 + Math.random() * 500),
    });
  }

  return data;
}

/**
 * Generate sales performance by product category
 */
export function generateProductPerformanceData() {
  return PRODUCT_CATEGORIES.map((category) => {
    const units = Math.floor(Math.random() * 5000 + 500);
    const pricePerUnit = Math.random() * 2000000 + 100000;
    const revenue = units * pricePerUnit;

    return {
      category,
      revenue: Math.round(revenue),
      units,
      avgPrice: Math.round(pricePerUnit),
      growth: Math.round((Math.random() - 0.3) * 80),
      profit: Math.round(revenue * (0.25 + Math.random() * 0.25)),
    };
  }).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Generate KPI metrics
 */
export function generateKPIMetrics() {
  const dailySales = generateDailySalesData(30);
  const totalRevenue = dailySales.reduce((sum, day) => sum + day.revenue, 0);
  const totalProfit = dailySales.reduce((sum, day) => sum + day.profit, 0);
  const totalOrders = dailySales.reduce((sum, day) => sum + day.orders, 0);
  const totalCustomers = Math.floor(Math.random() * 5000 + 10000);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  // Calculate growth percentages (previous 30 days vs previous 30 days)
  const prevMonthRevenue = totalRevenue * (0.85 + Math.random() * 0.15);
  const revenueGrowth = Math.round(((totalRevenue - prevMonthRevenue) / prevMonthRevenue) * 100);

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProfit,
    avgOrderValue,
    revenueGrowth,
    profitMargin: Math.round((totalProfit / totalRevenue) * 100),
  };
}

/**
 * Generate sales vs target data
 */
export function generateSalesTargetData(months = 6) {
  const data = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    const target = 2000000000 + Math.random() * 500000000;
    const achievement = target * (0.75 + Math.random() * 0.35);

    data.push({
      month: date.toLocaleString('en-US', { month: 'short' }),
      target: Math.round(target),
      actual: Math.round(achievement),
      percentage: Math.round((achievement / target) * 100),
    });
  }

  return data;
}

/**
 * Generate customer lifetime value distribution
 */
export function generateCustomerLTVDistribution() {
  return [
    { range: '$0 - $1M', count: Math.floor(Math.random() * 5000 + 1000) },
    { range: '$1M - $5M', count: Math.floor(Math.random() * 3000 + 500) },
    { range: '$5M - $10M', count: Math.floor(Math.random() * 2000 + 300) },
    { range: '$10M - $50M', count: Math.floor(Math.random() * 1000 + 100) },
    { range: '$50M+', count: Math.floor(Math.random() * 300 + 30) },
  ];
}

/**
 * Generate product ranking data
 */
export function generateProductRankingData() {
  return PRODUCTS.map((product, index) => ({
    ...product,
    rank: index + 1,
    revenue: Math.round(Math.random() * 500000000 + 50000000),
    units: Math.floor(Math.random() * 10000 + 100),
    rating: (Math.random() * 2 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 2000 + 100),
  })).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Generate data explorer sample data
 */
export function generateDataExplorerSample(rows = 100) {
  const data = [];

  for (let i = 0; i < rows; i++) {
    data.push({
      id: i + 1,
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)].name,
      category: PRODUCT_CATEGORIES[Math.floor(Math.random() * PRODUCT_CATEGORIES.length)],
      region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
      city: CITIES[Math.floor(Math.random() * CITIES.length)],
      segment: CUSTOMER_SEGMENTS[Math.floor(Math.random() * CUSTOMER_SEGMENTS.length)],
      revenue: Math.round(Math.random() * 100000000 + 1000000),
      units: Math.floor(Math.random() * 100 + 1),
      profit: Math.round(Math.random() * 50000000 + 500000),
    });
  }

  return data;
}

/**
 * Generate all dashboard data at once
 */
export function generateAllDashboardData() {
  return {
    dailySales: generateDailySalesData(30),
    monthlySales: generateMonthlySalesData(),
    kpis: generateKPIMetrics(),
    productCategoryDistribution: generateProductCategoryData(),
    topProducts: generateTopProductsData(),
    topCustomers: generateTopCustomersData(),
    regionalSales: generateRegionalSalesData(),
    citySales: generateCitySalesData(),
    customerDemographics: generateCustomerDemographicsData(),
    customerGrowth: generateCustomerGrowthTrend(),
    productPerformance: generateProductPerformanceData(),
    salesTarget: generateSalesTargetData(),
    customerLTV: generateCustomerLTVDistribution(),
    productRanking: generateProductRankingData(),
    dataExplorer: generateDataExplorerSample(),
  };
}
