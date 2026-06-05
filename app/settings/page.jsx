'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { DashboardLayout, GridLayout } from '@/components/dashboard';
import { Button, Card, Tabs } from '@/components/shared';

export default function Settings() {
  const { darkMode, toggleDarkMode, refreshData } = useDashboardStore();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'Asia/Jakarta',
    dateFormat: 'DD/MM/YYYY',
    currencyFormat: 'IDR',
    notifications: {
      email: true,
      dashboard: true,
      weekly: true,
      monthly: true,
    },
    export: {
      defaultFormat: 'pdf',
      includeCharts: true,
      includeSummary: true,
      compressFiles: false,
    },
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleSettingChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleToggleNotification = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleToggleExportOption = (key) => {
    setSettings((prev) => ({
      ...prev,
      export: {
        ...prev.export,
        [key]: !prev.export[key],
      },
    }));
  };

  const handleSaveSettings = () => {
    setSavedMessage('Settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const generalSettings = (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Toggle dark mode for the dashboard</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('', 'language', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('', 'timezone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Asia/Jakarta">Asia/Jakarta (UTC+7)</option>
              <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
              <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (UTC+7)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('', 'dateFormat', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency Format
            </label>
            <select
              value={settings.currencyFormat}
              onChange={(e) => handleSettingChange('', 'currencyFormat', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="IDR">Indonesian Rupiah (IDR)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="SGD">Singapore Dollar (SGD)</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  const notificationSettings = (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => handleToggleNotification('email', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive alerts via email</p>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.dashboard}
              onChange={(e) => handleToggleNotification('dashboard', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900">Dashboard Alerts</p>
              <p className="text-sm text-gray-600">Show alerts on dashboard</p>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.weekly}
              onChange={(e) => handleToggleNotification('weekly', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900">Weekly Summary</p>
              <p className="text-sm text-gray-600">Send weekly performance summary</p>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.monthly}
              onChange={(e) => handleToggleNotification('monthly', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <div>
              <p className="font-medium text-gray-900">Monthly Report</p>
              <p className="text-sm text-gray-600">Send monthly comprehensive report</p>
            </div>
          </label>
        </div>
      </Card>
    </div>
  );

  const exportSettings = (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Export Format
            </label>
            <select
              value={settings.export.defaultFormat}
              onChange={(e) => handleSettingChange('export', 'defaultFormat', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.export.includeCharts}
              onChange={(e) => handleToggleExportOption('includeCharts')}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-gray-900">Include Charts & Visualizations</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.export.includeSummary}
              onChange={(e) => handleToggleExportOption('includeSummary')}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-gray-900">Include Summary Tables</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.export.compressFiles}
              onChange={(e) => handleToggleExportOption('compressFiles')}
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-gray-900">Compress Files</span>
          </label>
        </div>
      </Card>
    </div>
  );

  const dataManagement = (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Refresh Dashboard Data</h4>
            <p className="text-sm text-gray-600 mb-4">
              Manually refresh all dashboard data from the source
            </p>
            <Button variant="primary" onClick={refreshData}>
              🔄 Refresh Now
            </Button>
          </div>

          <hr className="my-4" />

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Clear Cache</h4>
            <p className="text-sm text-gray-600 mb-4">Clear cached data and reset to defaults</p>
            <Button variant="secondary">🗑️ Clear Cache</Button>
          </div>

          <hr className="my-4" />

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Reset Settings</h4>
            <p className="text-sm text-gray-600 mb-4">Reset all settings to factory defaults</p>
            <Button variant="danger">↩️ Reset to Defaults</Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const settingsTabs = [
    { id: 'general', label: 'General', content: generalSettings },
    {
      id: 'notifications',
      label: 'Notifications',
      content: notificationSettings,
    },
    { id: 'export', label: 'Export', content: exportSettings },
    { id: 'data', label: 'Data Management', content: dataManagement },
  ];

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage dashboard preferences and configurations"
      actions={
        <Button variant="primary" onClick={handleSaveSettings}>
          💾 Save Settings
        </Button>
      }
    >
      {savedMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
          ✓ {savedMessage}
        </div>
      )}

      <GridLayout cols={1} gap={6}>
        <Tabs
          tabs={settingsTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="bg-white"
        />
      </GridLayout>
    </DashboardLayout>
  );
}
