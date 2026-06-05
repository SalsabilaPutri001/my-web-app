'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/shared/index';

/**
 * Sidebar Navigation Component
 */
export function Sidebar() {
  const { sidebarOpen, toggleSidebar, darkMode } = useDashboardStore();

  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', path: '/dashboard' },
    { id: 'sales', label: 'Sales Performance', path: '/sales' },
    { id: 'products', label: 'Product Performance', path: '/products' },
    { id: 'customers', label: 'Customer Analytics', path: '/customers' },
    { id: 'regional', label: 'Regional Sales', path: '/regional' },
    { id: 'reports', label: 'Reports', path: '/reports' },
    { id: 'explorer', label: 'Data Explorer', path: '/explorer' },
    { id: 'settings', label: 'Settings', path: '/settings' },
  ];

  if (!sidebarOpen) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-40 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        ☰
      </button>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 border-r border-gray-200 overflow-y-auto transition-all duration-300 ${
      darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'
    }`}>
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Analytics
            </h1>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sales Dashboard
            </p>
          </div>
          <button
            onClick={toggleSidebar}
            className={`p-1 hover:bg-gray-100 rounded-lg ${darkMode ? 'hover:bg-gray-800' : ''}`}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.path}
            className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
              darkMode
                ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

/**
 * Dashboard Header Component
 */
export function DashboardHeader({
  title,
  subtitle,
  actions,
}) {
  const { sidebarOpen, toggleSidebar, darkMode, toggleDarkMode } = useDashboardStore();

  return (
    <header className={`border-b border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-lg ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                ☰
              </button>
            )}
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h1>
              {subtitle && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {actions}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-yellow-400'
                : 'bg-gray-100 border-gray-300 text-gray-600'
            }`}
            title="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * Dashboard Layout Component
 */
export function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}) {
  const { sidebarOpen, darkMode } = useDashboardStore();

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <DashboardHeader
          title={title}
          subtitle={subtitle}
          actions={actions}
        />

        {/* Content */}
        <div className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Grid Layout Component
 */
export function GridLayout({
  cols = 3,
  gap = 6,
  children,
}) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]}`}>
      {children}
    </div>
  );
}

/**
 * Stats Row Component
 */
export function StatsRow({
  stats,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.change && (
                <p className={`text-sm font-medium mt-2 ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                </p>
              )}
            </div>
            {stat.icon && (
              <div className="p-3 bg-blue-100 rounded-lg">
                {stat.icon}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
