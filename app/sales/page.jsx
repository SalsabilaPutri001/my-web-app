'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout, GridLayout } from '@/components/dashboard';
import { LineChart, BarChart, DonutChart } from '@/components/charts';
import { DataTable } from '@/components/tables';
import { Button, Card } from '@/components/shared';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';

export default function SalesPerformance() {
  const { data } = useDashboardStore();
  const [sortBy, setSortBy] = useState('revenue');

  const monthlySalesData = data.monthlySales.map((item) => ({
    name: item.month,
    target: item.target,
    actual: item.actual,
    revenue: item.revenue,
    profit: item.profit,
  }));

  const salesTargetData = data.salesTarget;

  const dailySalesForTable = data.dailySales.map((item) => ({
    ...item,
    dateFormatted: item.date,
  }));

  const salesTableColumns = [
    { key: 'dateFormatted', label: 'Date' },
    {
      key: 'revenue',
      label: 'Revenue',
      render: (value) => formatCurrency(value),
    },
    { key: 'orders', label: 'Orders' },
    { key: 'customers', label: 'Customers' },
    {
      key: 'profit',
      label: 'Profit',
      render: (value) => formatCurrency(value),
    },
  ];

  const salesTargetColumns = [
    { key: 'month', label: 'Month' },
    {
      key: 'target',
      label: 'Target',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'actual',
      label: 'Actual',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'percentage',
      label: 'Achievement',
      render: (value) => `${value}%`,
    },
  ];

  return (
    <DashboardLayout
      title="Sales Performance"
      subtitle="Monitor your sales trends and performance metrics"
      actions={<Button variant="primary">📥 Export</Button>}
    >
      {/* Monthly Overview */}
      <GridLayout cols={2} gap={6} className="mb-8">
        <div className="lg:col-span-2">
          <LineChart
            data={monthlySalesData}
            title="Monthly Sales Trend"
            dataKeys={['revenue', 'profit']}
            height={350}
          />
        </div>
      </GridLayout>

      {/* Sales vs Target */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <BarChart
          data={salesTargetData}
          title="Sales vs Target"
          dataKeys={['target', 'actual']}
          height={350}
        />
      </GridLayout>

      {/* Daily Sales Table */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <DataTable
          data={dailySalesForTable}
          columns={salesTableColumns}
          title="Daily Sales Details"
          paginated={true}
          itemsPerPage={20}
        />
      </GridLayout>

      {/* Sales Target Table */}
      <GridLayout cols={1} gap={6}>
        <DataTable
          data={salesTargetData}
          columns={salesTargetColumns}
          title="Sales Target Achievement"
          paginated={true}
        />
      </GridLayout>
    </DashboardLayout>
  );
}
