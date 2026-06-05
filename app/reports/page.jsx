'use client';

import { useState } from 'react';
import { DashboardLayout, GridLayout } from '@/components/dashboard';
import { Button, Card, Modal, Tabs } from '@/components/shared';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeTab, setActiveTab] = useState('reports');
  const [exportFormat, setExportFormat] = useState('pdf');

  const reports = [
    {
      id: 1,
      name: 'Monthly Sales Report',
      description: 'Comprehensive sales analysis for the current month',
      lastGenerated: '2024-01-15',
      format: 'PDF',
    },
    {
      id: 2,
      name: 'Product Performance Report',
      description: 'Detailed analysis of product sales and growth',
      lastGenerated: '2024-01-14',
      format: 'Excel',
    },
    {
      id: 3,
      name: 'Customer Analytics Report',
      description: 'Customer segmentation and behavior analysis',
      lastGenerated: '2024-01-13',
      format: 'PDF',
    },
    {
      id: 4,
      name: 'Regional Sales Report',
      description: 'Performance metrics by region and city',
      lastGenerated: '2024-01-12',
      format: 'Excel',
    },
    {
      id: 5,
      name: 'Executive Summary',
      description: 'High-level business metrics and KPIs',
      lastGenerated: '2024-01-15',
      format: 'PDF',
    },
  ];

  const savedReports = [
    {
      id: 1,
      name: 'Q4 2023 Sales Report',
      createdDate: '2023-12-15',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Annual Performance Review',
      createdDate: '2023-12-01',
      size: '5.1 MB',
    },
    {
      id: 3,
      name: 'Product Strategy Analysis',
      createdDate: '2023-11-20',
      size: '1.8 MB',
    },
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Monthly Sales Report',
      schedule: 'Every 1st of the month at 9:00 AM',
      nextRun: '2024-02-01',
      recipients: ['manager@company.com', 'admin@company.com'],
    },
    {
      id: 2,
      name: 'Weekly Performance Summary',
      schedule: 'Every Monday at 8:00 AM',
      nextRun: '2024-01-22',
      recipients: ['team@company.com'],
    },
  ];

  const reportTabs = [
    {
      id: 'reports',
      label: 'Available Reports',
      content: (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                  <p className="text-xs text-gray-500">
                    Last generated: {report.lastGenerated} • Format: {report.format}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => setSelectedReport(report)}>
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowExportModal(true)}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 'saved',
      label: 'Saved Reports',
      content: (
        <div className="space-y-4">
          {savedReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-xs text-gray-500">
                    Created: {report.createdDate} • Size: {report.size}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    📥 Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    ⋯
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 'scheduled',
      label: 'Scheduled Reports',
      content: (
        <div className="space-y-4">
          {scheduledReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">Schedule: {report.schedule}</p>
                  <p className="text-sm text-gray-600 mb-2">Next run: {report.nextRun}</p>
                  <p className="text-xs text-gray-500">
                    Recipients: {report.recipients.join(', ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <Button variant="primary" className="w-full mt-4">
            + Create Scheduled Report
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout
      title="Reports"
      subtitle="Generate, manage, and schedule your analytics reports"
      actions={
        <div className="flex gap-2">
          <Button variant="secondary">🔄 Refresh</Button>
          <Button variant="primary">+ New Report</Button>
        </div>
      }
    >
      <GridLayout cols={1} gap={6}>
        <Tabs tabs={reportTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </GridLayout>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Report"
        size="md"
        actions={
          <>
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary">Export</Button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel (.xlsx)</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Include in Export
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Charts & Visualizations</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Summary Table</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Detailed Data</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Comments</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
