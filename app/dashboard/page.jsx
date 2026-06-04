'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/StatCard';
import { TopFilmsChart } from '@/components/TopFilmsChart';
import { RevenueTrendChart } from '@/components/RevenueTrendChart';
import { RecentRentalsTable } from '@/components/RecentRentalsTable';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [topFilms, setTopFilms] = useState([]);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [recentRentals, setRecentRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, filmsRes, trendRes, rentalsRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/top-films'),
          fetch('/api/dashboard/revenue-trend'),
          fetch('/api/dashboard/recent-rentals'),
        ]);

        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data.data);
        }
        if (filmsRes.ok) {
          const data = await filmsRes.json();
          setTopFilms(data.data);
        }
        if (trendRes.ok) {
          const data = await trendRes.json();
          setRevenueTrend(data.data);
        }
        if (rentalsRes.ok) {
          const data = await rentalsRes.json();
          setRecentRentals(data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sales Dashboard</h1>
          <p className="text-gray-600">Sakila Film Rental Management System</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={stats ? `$${Number(stats.totalRevenue || 0).toFixed(2)}` : '$0.00'}
            icon="💰"
            color="bg-blue-500"
          />
          <StatCard
            title="Total Rentals"
            value={stats?.totalRentals || 0}
            icon="🎬"
            color="bg-green-500"
          />
          <StatCard
            title="Total Customers"
            value={stats?.totalCustomers || 0}
            icon="👥"
            color="bg-purple-500"
          />
          <StatCard
            title="Total Films"
            value={stats?.totalFilms || 0}
            icon="📚"
            color="bg-orange-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {topFilms.length > 0 && <TopFilmsChart data={topFilms} />}
          {revenueTrend.length > 0 && <RevenueTrendChart data={revenueTrend} />}
        </div>

        {/* Recent Rentals Table */}
        {recentRentals.length > 0 && <RecentRentalsTable data={recentRentals} />}
      </div>
    </div>
  );
}
