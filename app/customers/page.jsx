'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout, GridLayout } from '@/components/dashboard';
import { LineChart, BarChart, DonutChart } from '@/components/charts';
import { DataTable } from '@/components/tables';
import { Button, Card } from '@/components/shared';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function CustomerAnalytics() {
  const { data } = useDashboardStore();

  const customerGrowth = data.customerGrowth;
  const customerDemographics = data.customerDemographics;
  const topCustomers = data.topCustomers;
  const customerLTV = data.customerLTV;

  // Prepare chart data
  const growthChartData = customerGrowth.map((item) => ({
    name: item.month,
    total: item.total,
    new: item.new,
    returning: item.returning,
  }));

  const demographicsChartData = customerDemographics.map((item) => ({
    name: item.segment,
    new: item.new,
    returning: item.returning,
  }));

  const ltvChartData = customerLTV;

  const topCustomersColumns = [
    { key: 'name', label: 'Customer' },
    { key: 'segment', label: 'Segment' },
    {
      key: 'revenue',
      label: 'Lifetime Value',
      render: (value) => formatCurrency(value),
    },
    { key: 'orders', label: 'Orders' },
    { key: 'lastPurchase', label: 'Last Purchase' },
  ];

  const demographicsColumns = [
    { key: 'segment', label: 'Segment' },
    { key: 'new', label: 'New Customers' },
    { key: 'returning', label: 'Returning Customers' },
    {
      key: 'churnRate',
      label: 'Churn Rate',
      render: (value) => `${value}%`,
    },
  ];

  const ltvColumns = [
    { key: 'range', label: 'Value Range' },
    { key: 'count', label: 'Number of Customers' },
  ];

  return (
    <DashboardLayout
      title="Customer Analytics"
      subtitle="Understand customer behavior and segments"
      actions={<Button variant="primary">📥 Export</Button>}
    >
      {/* Customer Growth Trend */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <LineChart
          data={growthChartData}
          title="Customer Growth Trend (12 Months)"
          dataKeys={['total', 'new', 'returning']}
          height={350}
        />
      </GridLayout>

      {/* Customer Demographics */}
      <GridLayout cols={2} gap={6} className="mb-8">
        <BarChart
          data={demographicsChartData}
          title="Customers by Segment"
          dataKeys={['new', 'returning']}
          height={350}
        />
        <DonutChart
          data={ltvChartData}
          title="Customer Lifetime Value Distribution"
          nameKey="range"
          dataKey="count"
          height={350}
        />
      </GridLayout>

      {/* Customer Segment Analysis */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <DataTable
          data={customerDemographics}
          columns={demographicsColumns}
          title="Customer Segment Analysis"
          paginated={true}
        />
      </GridLayout>

      {/* Top Customers */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <DataTable
          data={topCustomers}
          columns={topCustomersColumns}
          title="Top Customers by Lifetime Value"
          paginated={true}
        />
      </GridLayout>

      {/* Customer LTV Distribution */}
      <GridLayout cols={1} gap={6}>
        <DataTable
          data={customerLTV}
          columns={ltvColumns}
          title="Customer Lifetime Value Distribution"
          paginated={true}
        />
      </GridLayout>
    </DashboardLayout>
  );
}
