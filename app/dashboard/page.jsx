'use client';

import { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout } from '@/components/dashboard';
import { LineChart, BarChart, DonutChart } from '@/components/charts';
import { SimpleTable } from '@/components/tables';
import { DateRangePicker, AdvancedFilters, QuickFilters } from '@/components/filters';
import { Badge, Button, Card } from '@/components/shared';
import { formatCurrency, formatNumber, formatDate, formatDateRange } from '@/lib/utils';

export default function Dashboard() {
  const store = useDashboardStore();
  const {
    data,
    dateRange,
    setDateRange,
    selectedRegions,
    selectedCategories,
    selectedSegments,
    clearAllFilters,
  } = store;

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [quickFilter, setQuickFilter] = useState('month');

  useEffect(() => {
    // generate mock data only on client after hydration
    if (store.initData) store.initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuickFilter = (filter) => {
    const now = new Date();
    const from = new Date();

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
      default:
        from.setDate(1);
        break;
    }

    setQuickFilter(filter);
    setDateRange(from, now);
  };

  const handleResetFilters = () => {
    const now = new Date();
    const from = new Date();

    from.setDate(1);
    setQuickFilter('month');
    clearAllFilters();
    setDateRange(from, now);
  };

  const kpis = data.kpis;
  const dailySales = data.dailySales;
  const topProducts = data.topProducts;
  const topCustomers = data.topCustomers;
  const productCategories = data.productCategoryDistribution;
  const regionalSales = data.regionalSales;

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

  const regionalChartData = regionalSales.slice(0, 6).map((item) => ({
    name: item.region,
    revenue: item.revenue,
    orders: item.orders,
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

  const kpiCards = [
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: formatCurrency(kpis.totalRevenue),
      change: kpis.revenueGrowth,
      icon: '💰',
      tone: 'from-sky-500 to-cyan-400',
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: formatNumber(kpis.totalOrders),
      change: 15,
      icon: '📦',
      tone: 'from-indigo-500 to-violet-400',
    },
    {
      id: 'customers',
      label: 'Total Customers',
      value: formatNumber(kpis.totalCustomers),
      change: 8,
      icon: '👥',
      tone: 'from-emerald-500 to-teal-400',
    },
    {
      id: 'profit',
      label: 'Gross Profit',
      value: formatCurrency(kpis.totalProfit),
      change: kpis.revenueGrowth,
      icon: '📈',
      tone: 'from-amber-500 to-orange-400',
    },
    {
      id: 'aov',
      label: 'Avg Order Value',
      value: formatCurrency(kpis.avgOrderValue),
      change: 5,
      icon: '💵',
      tone: 'from-fuchsia-500 to-pink-400',
    },
    {
      id: 'margin',
      label: 'Profit Margin',
      value: `${kpis.profitMargin}%`,
      change: 2,
      icon: '📊',
      tone: 'from-rose-500 to-red-400',
    },
  ];

  const quickFilterLabel =
    quickFilter === 'today'
      ? 'Today'
      : quickFilter === 'week'
        ? 'This Week'
        : quickFilter === 'quarter'
          ? 'This Quarter'
          : quickFilter === 'year'
            ? 'This Year'
            : 'This Month';

  const filterSummary = [
    { label: 'Period', value: quickFilterLabel },
    { label: 'Regions', value: `${selectedRegions.length}` },
    { label: 'Categories', value: `${selectedCategories.length}` },
    { label: 'Segments', value: `${selectedSegments.length}` },
  ];

  const headerActions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setShowAdvancedFilters(true)}>
        🔍 Filters
      </Button>
      <Button variant="primary">📥 Export</Button>
    </div>
  );

  return (
    <DashboardLayout
      title="Executive Dashboard"
      subtitle={`Data from ${formatDateRange(dateRange.from, dateRange.to)}`}
      actions={headerActions}
    >
      <div className="space-y-6">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Executive Controls</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">Filters and time range</h2>
              </div>
              <QuickFilters filters={quickFilter} onFilterChange={handleQuickFilter} />
              <div className="flex flex-wrap gap-2">
                {filterSummary.map((item) => (
                  <Badge key={item.label} variant="gray" className="bg-slate-100 text-slate-700">
                    {item.label}: {item.value}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 xl:w-full xl:max-w-xl">
              <DateRangePicker from={dateRange.from} to={dateRange.to} onChange={setDateRange} />
              <div className="flex flex-wrap items-center justify-end gap-3">
                {(selectedRegions.length > 0 || selectedCategories.length > 0 || selectedSegments.length > 0) && (
                  <span className="text-sm text-slate-500">
                    {selectedRegions.length} region(s), {selectedCategories.length} category(ies), {selectedSegments.length} segment(s) selected
                  </span>
                )}
                <Button variant="secondary" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
                <Button variant="outline" onClick={() => setShowAdvancedFilters(true)}>
                  Advanced Filters
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {kpiCards.map((stat) => (
            <Card key={stat.id} className="relative overflow-hidden rounded-2xl border-slate-200 p-5 shadow-sm">
              <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${stat.tone}`} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <p className={`mt-2 text-sm font-medium ${stat.change > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <LineChart data={salesTrendData} title="Sales Trend" dataKeys={['revenue', 'profit']} height={340} />
          </div>
          <div className="xl:col-span-4 space-y-6">
            <DonutChart data={categoryData} title="Revenue by Category" height={300} />
            <BarChart data={regionalChartData} title="Revenue by Region" dataKey="revenue" height={300} />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <SimpleTable data={topProducts} columns={topProductsTableColumns} title="Top 5 Products" maxRows={5} />
          <SimpleTable data={topCustomers} columns={topCustomersTableColumns} title="Top Customers" maxRows={5} />
        </section>

        <section>
          <SimpleTable data={regionalSales} columns={regionTableColumns} title="Sales by Region" maxRows={10} />
        </section>

        <AdvancedFilters
          isOpen={showAdvancedFilters}
          onClose={() => setShowAdvancedFilters(false)}
          filters={{
            regions: selectedRegions,
            categories: selectedCategories,
            segments: selectedSegments,
          }}
          onFiltersChange={() => {
            // Intentionally left as a visual shell for now.
          }}
          regions={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatera Utara', 'Sulawesi Selatan']}
          categories={['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Food & Beverage']}
          segments={['Premium', 'Mid-Market', 'SME', 'Startup', 'Enterprise']}
        />
      </div>
    </DashboardLayout>
  );
}
