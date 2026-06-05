'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout, GridLayout, StatsRow } from '@/components/dashboard';
import { LineChart, AreaChart, BarChart, DonutChart } from '@/components/charts';
import { SimpleTable } from '@/components/tables';
import { DateRangePicker, AdvancedFilters, QuickFilters } from '@/components/filters';
import { Button, Card } from '@/components/shared';
import { formatCurrency, formatNumber, formatDate, formatDateRange } from '@/lib/utils';

export default function Dashboard() {
  const store = useDashboardStore();
  const { data, dateRange, setDateRange, selectedRegions, selectedCategories, selectedSegments } = store;
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [quickFilter, setQuickFilter] = useState('month');

  const handleQuickFilter = (filter) => {
    const now = new Date();
    let from = new Date();

    switch (filter) {
      case 'today':
        from.setHours(0, 0, 0, 0);
        break;
      case 'week':
        from.setDate(now.getDate() - now.getDay());
        break;
      case 'month':
        from.setDate(1);
        break;
      case 'quarter':
        from.setMonth(Math.floor(now.getMonth() / 3) * 3);
        from.setDate(1);
        break;
      case 'year':
        from.setMonth(0);
        from.setDate(1);
        break;
    }

    setQuickFilter(filter);
    setDateRange(from, now);
  };

  const kpis = data.kpis;
  const dailySales = data.dailySales;
  const topProducts = data.topProducts;
  const topCustomers = data.topCustomers;
  const productCategories = data.productCategoryDistribution;
  const regionalSales = data.regionalSales;

  // Prepare chart data
  const salesTrendData = dailySales.map((item) => ({
    name: formatDate(item.date, 'short'),
    revenue: item.revenue,
    orders: item.orders,
    profit: item.profit,
  }));

  const categoryData = productCategories.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const topProductsTableColumns = [
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'units', label: 'Units' },
    {
      key: 'growth',
      label: 'Growth',
      render: (value) => (
        <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
          {value > 0 ? '↑' : '↓'} {Math.abs(value)}%
        </span>
      ),
    },
  ];

  const topCustomersTableColumns = [
    { key: 'name', label: 'Customer' },
    { key: 'segment', label: 'Segment' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'orders', label: 'Orders' },
  ];

  const regionTableColumns = [
    { key: 'region', label: 'Region' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'orders', label: 'Orders' },
    {
      key: 'growth',
      label: 'Growth',
      render: (value) => (
        <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
          {value > 0 ? '↑' : '↓'} {Math.abs(value)}%
        </span>
      ),
    },
  ];

  const statsData = [
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: formatCurrency(kpis.totalRevenue),
      change: kpis.revenueGrowth,
      icon: '💰',
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: formatNumber(kpis.totalOrders),
      change: 15,
      icon: '📦',
    },
    {
      id: 'customers',
      label: 'Total Customers',
      value: formatNumber(kpis.totalCustomers),
      change: 8,
      icon: '👥',
    },
    {
      id: 'profit',
      label: 'Gross Profit',
      value: formatCurrency(kpis.totalProfit),
      change: kpis.revenueGrowth,
      icon: '📈',
    },
    {
      id: 'aov',
      label: 'Avg Order Value',
      value: formatCurrency(kpis.avgOrderValue),
      change: 5,
      icon: '💵',
    },
    {
      id: 'margin',
      label: 'Profit Margin',
      value: `${kpis.profitMargin}%`,
      change: 2,
      icon: '📊',
    },
  ];

  const headerActions = (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={() => setShowAdvancedFilters(true)}
      >
        🔍 Filters
      </Button>
      <Button variant="primary">
        📥 Export
      </Button>
    </div>
  );

  return (
    <DashboardLayout
      title="Executive Dashboard"
      subtitle={`Data from ${formatDateRange(dateRange.from, dateRange.to)}`}
      actions={headerActions}
    >
      {/* Quick Filters */}
      <div className="mb-8">
        <QuickFilters
          filters={quickFilter}
          onFilterChange={handleQuickFilter}
        />
      </div>

      {/* Date Range Picker */}
      <Card className="mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <DateRangePicker
              from={dateRange.from}
              to={dateRange.to}
              onChange={setDateRange}
            />
          </div>
          {(selectedRegions.length > 0 || selectedCategories.length > 0 || selectedSegments.length > 0) && (
            <div className="text-sm text-gray-600">
              {selectedRegions.length} region(s), {selectedCategories.length} category(ies), {selectedSegments.length} segment(s) selected
            </div>
          )}
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="mb-8">
        <StatsRow stats={statsData} />
      </div>

      {/* Charts Section */}
      <GridLayout cols={2} gap={6} className="mb-8">
        <div className="lg:col-span-2">
          <LineChart
            data={salesTrendData}
            title="Sales Trend (30 Days)"
            dataKeys={['revenue', 'profit']}
            height={300}
          />
        </div>
      </GridLayout>

      {/* Middle Row */}
      <GridLayout cols={2} gap={6} className="mb-8">
        <AreaChart
          data={salesTrendData}
          title="Revenue Trend"
          dataKey="revenue"
          height={300}
        />
        <DonutChart
          data={categoryData}
          title="Revenue by Category"
          height={300}
        />
      </GridLayout>

      {/* Tables Section */}
      <GridLayout cols={2} gap={6} className="mb-8">
        <SimpleTable
          data={topProducts}
          columns={topProductsTableColumns}
          title="Top 5 Products"
          maxRows={5}
        />
        <SimpleTable
          data={topCustomers}
          columns={topCustomersTableColumns}
          title="Top Customers"
          maxRows={5}
        />
      </GridLayout>

      {/* Regional Sales */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <SimpleTable
          data={regionalSales}
          columns={regionTableColumns}
          title="Sales by Region"
          maxRows={10}
        />
      </GridLayout>

      {/* Advanced Filters Drawer */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        filters={{
          regions: selectedRegions,
          categories: selectedCategories,
          segments: selectedSegments,
        }}
        onFiltersChange={(filters) => {
          // Update filters in store
          // This is where you'd call store actions
        }}
        regions={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatera Utara', 'Sulawesi Selatan']}
        categories={['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Food & Beverage']}
        segments={['Premium', 'Mid-Market', 'SME', 'Startup', 'Enterprise']}
      />
    </DashboardLayout>
  );
}
