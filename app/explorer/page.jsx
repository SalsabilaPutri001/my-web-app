'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout, GridLayout } from '@/components/dashboard';
import { DataTable } from '@/components/tables';
import { Button, Card } from '@/components/shared';
import { SearchBar, MultiSelectFilter } from '@/components/filters';
import { formatCurrency, filterBySearch } from '@/lib/utils';

export default function DataExplorer() {
  const { data } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([
    'date',
    'product',
    'category',
    'region',
    'revenue',
    'units',
  ]);

  const [columnFilters, setColumnFilters] = useState({
    categories: [],
    regions: [],
    segments: [],
  });

  const explorerData = data.dataExplorer;

  // Filter data based on search and column filters
  let filteredData = explorerData;

  if (searchQuery) {
    filteredData = filterBySearch(filteredData, searchQuery, [
      'product',
      'category',
      'region',
      'city',
      'segment',
    ]);
  }

  if (columnFilters.categories.length > 0) {
    filteredData = filteredData.filter((item) =>
      columnFilters.categories.includes(item.category)
    );
  }

  if (columnFilters.regions.length > 0) {
    filteredData = filteredData.filter((item) =>
      columnFilters.regions.includes(item.region)
    );
  }

  if (columnFilters.segments.length > 0) {
    filteredData = filteredData.filter((item) =>
      columnFilters.segments.includes(item.segment)
    );
  }

  // Available columns
  const availableColumns = [
    { key: 'date', label: 'Date' },
    { key: 'product', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'region', label: 'Region' },
    { key: 'city', label: 'City' },
    { key: 'segment', label: 'Segment' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'units', label: 'Units' },
    { key: 'profit', label: 'Profit' },
  ];

  // Build display columns based on selection
  const displayColumns = availableColumns
    .filter((col) => selectedColumns.includes(col.key))
    .map((col) => ({
      ...col,
      render:
        col.key === 'revenue' || col.key === 'profit'
          ? (value) => formatCurrency(value)
          : undefined,
    }));

  const handleColumnToggle = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  return (
    <DashboardLayout
      title="Data Explorer"
      subtitle="Interactive data exploration and analysis"
      actions={
        <div className="flex gap-2">
          <Button variant="secondary">🔄 Refresh</Button>
          <Button variant="primary">📥 Export to CSV</Button>
        </div>
      }
    >
      {/* Search and Filters */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search & Filter</h3>
          <div className="space-y-4">
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by product, region, category..."
            />

            {/* Column Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MultiSelectFilter
                label="Categories"
                options={[
                  'Electronics',
                  'Fashion',
                  'Home & Garden',
                  'Sports',
                  'Food & Beverage',
                  'Beauty & Personal Care',
                ]}
                selected={columnFilters.categories}
                onChange={(value) =>
                  setColumnFilters({ ...columnFilters, categories: value })
                }
              />
              <MultiSelectFilter
                label="Regions"
                options={[
                  'Jawa Barat',
                  'Jawa Tengah',
                  'Jawa Timur',
                  'Sumatera Utara',
                  'Sumatera Selatan',
                ]}
                selected={columnFilters.regions}
                onChange={(value) =>
                  setColumnFilters({ ...columnFilters, regions: value })
                }
              />
              <MultiSelectFilter
                label="Segments"
                options={['Premium', 'Mid-Market', 'SME', 'Startup', 'Enterprise']}
                selected={columnFilters.segments}
                onChange={(value) =>
                  setColumnFilters({ ...columnFilters, segments: value })
                }
              />
            </div>
          </div>
        </Card>
      </GridLayout>

      {/* Column Selection */}
      <GridLayout cols={1} gap={6} className="mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Columns</h3>
          <div className="flex flex-wrap gap-2">
            {availableColumns.map((col) => (
              <button
                key={col.key}
                onClick={() => handleColumnToggle(col.key)}
                className={`px-3 py-2 rounded-lg border-2 font-medium transition-colors ${
                  selectedColumns.includes(col.key)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>
        </Card>
      </GridLayout>

      {/* Data Table */}
      <GridLayout cols={1} gap={6}>
        <DataTable
          data={filteredData}
          columns={displayColumns}
          title={`Data Results (${filteredData.length} records)`}
          paginated={true}
          itemsPerPage={25}
          sortable={true}
        />
      </GridLayout>

      {/* Query Info */}
      <GridLayout cols={1} gap={6} className="mt-8">
        <Card className="bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Query Info:</strong> Showing {filteredData.length} of {explorerData.length} records
            {searchQuery && ` matching "${searchQuery}"`}
            {(columnFilters.categories.length > 0 ||
              columnFilters.regions.length > 0 ||
              columnFilters.segments.length > 0) &&
              ` with applied filters`}
          </p>
        </Card>
      </GridLayout>
    </DashboardLayout>
  );
}
