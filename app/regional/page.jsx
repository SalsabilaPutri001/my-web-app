'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout, GridLayout } from '@/components/dashboard';
import { BarChart, DonutChart } from '@/components/charts';
import { DataTable } from '@/components/tables';
import { Button } from '@/components/shared';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function RegionalSales() {
  const { data } = useDashboardStore();

  const regionalSales = data.regionalSales;
  const citySales = data.citySales;

  // Prepare chart data
  const regionalChartData = regionalSales.map((item) => ({
    name: item.region,
    revenue: item.revenue,
    orders: item.orders,
  }));

  const regionalDonutData = regionalSales.map((item) => ({
    name: item.region,
    value: item.revenue,
  }));

  const cityChartData = citySales.map((item) => ({
    name: item.city,
    revenue: item.revenue,
  }));

  const regionalTableColumns = [
    { key: 'region', label: 'Region' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'orders', label: 'Orders' },
    {
      key: 'profit',
      label: 'Profit',
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
  ];

  const cityTableColumns = [
    { key: 'city', label: 'City' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'orders', label: 'Orders' },
    {
      key: 'profit',
      label: 'Profit',
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <DashboardLayout
      title="Regional Sales"
      subtitle="Track sales performance by region and city"
      actions={<Button variant="primary">📥 Export</Button>}
    >
      {/* Regional Overview */}
      <GridLayout cols={2} gap={6} className="mb-8">
        <BarChart
          data={regionalChartData}
          title="Sales by Region"
          dataKeys={['revenue', 'orders']}
          height={350}
        />
        <DonutChart
          data={regionalDonutData}
          title="Revenue Distribution by Region"
          height={350}
        />
      </GridLayout>

      {/* Regional Performance Table */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <DataTable
          data={regionalSales}
          columns={regionalTableColumns}
          title="Regional Sales Performance"
          paginated={true}
        />
      </GridLayout>

      {/* City-Level Sales */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <BarChart
          data={cityChartData}
          title="Sales by City"
          dataKey="revenue"
          height={350}
        />
      </GridLayout>

      {/* City Sales Table */}
      <GridLayout cols={1} gap={6}>
        <DataTable
          data={citySales}
          columns={cityTableColumns}
          title="City-Level Sales Analysis"
          paginated={true}
        />
      </GridLayout>
    </DashboardLayout>
  );
}
