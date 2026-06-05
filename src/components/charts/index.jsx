'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Card } from '@/components/shared';
import { CHART_COLORS } from '@/lib/utils';

/**
 * Line Chart Component
 */
export function LineChart({
  data,
  title,
  dataKey,
  dataKeys = [],
  height = 300,
  showGrid = true,
  showLegend = true,
  colors = CHART_COLORS,
}) {
  if (!data || data.length === 0) {
    return <Card className="h-80 flex items-center justify-center text-gray-500">No data available</Card>;
  }

  const keysToShow = dataKeys.length > 0 ? dataKeys : [dataKey];

  return (
    <Card>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {showLegend && <Legend />}
          {keysToShow.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
}

/**
 * Bar Chart Component
 */
export function BarChart({
  data,
  title,
  dataKey,
  dataKeys = [],
  height = 300,
  showGrid = true,
  showLegend = true,
  colors = CHART_COLORS,
}) {
  if (!data || data.length === 0) {
    return <Card className="h-80 flex items-center justify-center text-gray-500">No data available</Card>;
  }

  const keysToShow = dataKeys.length > 0 ? dataKeys : [dataKey];

  return (
    <Card>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {showLegend && <Legend />}
          {keysToShow.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  );
}

/**
 * Area Chart Component
 */
export function AreaChart({
  data,
  title,
  dataKey,
  dataKeys = [],
  height = 300,
  showGrid = true,
  showLegend = true,
  colors = CHART_COLORS,
}) {
  if (!data || data.length === 0) {
    return <Card className="h-80 flex items-center justify-center text-gray-500">No data available</Card>;
  }

  const keysToShow = dataKeys.length > 0 ? dataKeys : [dataKey];

  return (
    <Card>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {showLegend && <Legend />}
          {keysToShow.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              fill={colors[index % colors.length]}
              stroke={colors[index % colors.length]}
              fillOpacity={0.6}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

/**
 * Pie Chart Component
 */
export function PieChart({
  data,
  title,
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  colors = CHART_COLORS,
}) {
  if (!data || data.length === 0) {
    return <Card className="h-80 flex items-center justify-center text-gray-500">No data available</Card>;
  }

  return (
    <Card>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Card>
  );
}

/**
 * Donut Chart Component
 */
export function DonutChart({
  data,
  title,
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  colors = CHART_COLORS,
}) {
  if (!data || data.length === 0) {
    return <Card className="h-80 flex items-center justify-center text-gray-500">No data available</Card>;
  }

  return (
    <Card>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Card>
  );
}

/**
 * Composed Chart - Multiple chart types in one
 */
export function ComposedChart({
  data,
  title,
  lineKeys = [],
  barKeys = [],
  height = 300,
  showGrid = true,
  colors = CHART_COLORS,
}) {
  if (!data || data.length === 0) {
    return <Card className="h-80 flex items-center justify-center text-gray-500">No data available</Card>;
  }

  return (
    <Card>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <Legend />
          {barKeys.map((key, index) => (
            <Bar key={`bar-${key}`} dataKey={key} fill={colors[index % colors.length]} />
          ))}
          {lineKeys.map((key, index) => (
            <Line
              key={`line-${key}`}
              type="monotone"
              dataKey={key}
              stroke={colors[(index + barKeys.length) % colors.length]}
              strokeWidth={2}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  );
}
