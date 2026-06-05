'use client';

import { classNames } from '@/lib/utils';

/**
 * Button Component
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = 'font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:border-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={classNames(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Card Component
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div className={classNames('bg-white rounded-lg shadow-sm border border-gray-200 p-6', className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Input Component
 */
export function Input({
  type = 'text',
  placeholder = '',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={classNames(
        'w-full px-4 py-2 text-base border border-gray-300 rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

/**
 * Select Component
 */
export function Select({
  options = [],
  placeholder = 'Select...',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <select
      disabled={disabled}
      className={classNames(
        'w-full px-4 py-2 text-base border border-gray-300 rounded-lg bg-white',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/**
 * Badge Component
 */
export function Badge({
  children,
  variant = 'gray',
  className = '',
  ...props
}) {
  const variants = {
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * KPI Card Component
 */
export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
  className = '',
}) {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';

  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`text-sm font-medium mt-2 ${trendColor}`}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Skeleton Loader Component
 */
export function Skeleton({ className = '' }) {
  return (
    <div
      className={classNames(
        'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg',
        'animate-pulse',
        className
      )}
    />
  );
}

/**
 * Empty State Component
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {Icon && <Icon className="w-12 h-12 text-gray-400 mb-4" />}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {action && action}
    </div>
  );
}

/**
 * Modal Component
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
}) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'w-96',
    md: 'w-2xl',
    lg: 'w-4xl',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={classNames('bg-white rounded-lg shadow-xl', sizes[size])}>
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div className="p-6">{children}</div>

        {actions && (
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-6 bg-gray-50">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Drawer Component (Sidebar)
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
}) {
  if (!isOpen) return null;

  const sideClasses = side === 'left' ? 'left-0' : 'right-0';

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div
        className={classNames(
          'fixed top-0 bottom-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300',
          sideClasses,
          isOpen ? 'translate-x-0' : sideClasses === 'left-0' ? '-translate-x-full' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">{children}</div>
      </div>
    </>
  );
}

/**
 * Toast/Alert Component
 */
export function Toast({
  message,
  type = 'info',
  onClose,
}) {
  const typeStyles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div className={classNames(
      'fixed bottom-4 right-4 p-4 rounded-lg border flex items-center justify-between gap-4 max-w-md shadow-lg z-50',
      typeStyles[type]
    )}>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-inherit hover:opacity-70 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Tabs Component
 */
export function Tabs({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) {
  return (
    <div className={className}>
      <div className="flex border-b border-gray-200 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={classNames(
              'px-4 py-3 font-medium text-sm border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
