'use client';

import { ReactNode } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';

export function DashboardProvider({ children }) {
  const { darkMode } = useDashboardStore();

  return (
    <div className={darkMode ? 'dark' : ''}>
      {children}
    </div>
  );
}
