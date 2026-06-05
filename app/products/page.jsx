'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout, GridLayout } from '@/components/dashboard';
import { BarChart, DonutChart } from '@/components/charts';
import { DataTable } from '@/components/tables';
import { Button } from '@/components/shared';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';

export default function ProductPerformance() {
  const { data } = useDashboardStore();

  const productPerformance = data.productPerformance;
  const productRanking = data.productRanking;
  const categoryDistribution = data.productCategoryDistribution;

  // Prepare chart data
  const categoryChartData = productPerformance.map((item) => ({
    name: item.category,
    revenue: item.revenue,
    profit: item.profit,
  }));

  const categoryDistributionData = categoryDistribution.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const productTableColumns = [
    { key: 'rank', label: 'Rank' },
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'units', label: 'Units Sold' },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => `${value} ⭐`,
    },
    { key: 'reviews', label: 'Reviews' },
  ];

  const categoryTableColumns = [
    { key: 'category', label: 'Category' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'units', label: 'Units' },
    {
      key: 'avgPrice',
      label: 'Avg Price',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'growth',
      label: 'Growth',
      render: (value) => (
        <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
          {value > 0 ? '↑' : '↓'} {Math.abs(value)}%
        </span>
      ),
    },
    {
      key: 'profit',
      label: 'Profit',
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <DashboardLayout
      title="Product Performance"
      subtitle="Analyze product sales, revenue, and performance metrics"
      actions={<Button variant="primary">📥 Export</Button>}
    >
      {/* Category Revenue Analysis */}
      <GridLayout cols={2} gap={6} className="mb-8">
        <BarChart
          data={categoryChartData}
          title="Revenue by Category"
          dataKeys={['revenue', 'profit']}
          height={350}
        />
        <DonutChart
          data={categoryDistributionData}
          title="Revenue Distribution"
          height={350}
        />
      </GridLayout>

      {/* Category Performance Table */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <DataTable
          data={productPerformance}
          columns={categoryTableColumns}
          title="Category Performance"
          paginated={true}
        />
      </GridLayout>

      {/* Product Ranking Table */}
      <GridLayout cols={1} gap={6}>
        <DataTable
          data={productRanking}
          columns={productTableColumns}
          title="Product Rankings"
          paginated={true}
          itemsPerPage={20}
        />
      </GridLayout>
    </DashboardLayout>
  );
}
