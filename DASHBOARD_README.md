# Sales Analytics Dashboard

A modern, professional Web Sales Analytics Dashboard built with Next.js 16, TailwindCSS, Recharts, and Zustand. This is a frontend-focused analytics platform designed to be enterprise-ready with beautiful UI/UX.

## 🚀 Features

### Core Pages
- **Executive Dashboard** - High-level KPIs, trends, and key metrics
- **Sales Performance** - Detailed sales analysis with monthly trends
- **Product Performance** - Product rankings, category analysis
- **Customer Analytics** - Customer segments, growth trends, LTV analysis
- **Regional Sales** - Sales by region and city
- **Reports** - Report generation, scheduling, and management
- **Data Explorer** - Interactive data table with filters and search
- **Settings** - Dashboard configuration and preferences

### UI/UX Features
- ✨ **Dark Mode** - Full dark mode support
- 📱 **Responsive Design** - Mobile, tablet, and desktop layouts
- 🎨 **Modern Design** - Professional SaaS-style interface
- 📊 **Rich Visualizations** - Line, Bar, Area, Pie, and Donut charts
- 🔍 **Advanced Filters** - Multi-select filters, date range picker
- 📄 **Data Tables** - Sortable, paginated tables with search
- 🎯 **KPI Cards** - Beautiful metric cards with trend indicators
- 📥 **Export UI** - Export to PDF, Excel, CSV, JSON

### Data & State Management
- 📦 **Zustand** - Lightweight state management
- 🎲 **Mock Data** - Realistic demo data generators
- 📊 **100+ Data Points** - Comprehensive mock data for all features
- 🔄 **Data Refresh** - Manual data refresh capability

## 📋 Project Structure

```
src/
├── app/
│   ├── dashboard/          # Executive Dashboard
│   ├── sales/             # Sales Performance
│   ├── products/          # Product Performance
│   ├── customers/         # Customer Analytics
│   ├── regional/          # Regional Sales
│   ├── reports/           # Reports
│   ├── explorer/          # Data Explorer
│   ├── settings/          # Settings
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Homepage (redirect to dashboard)
│   └── globals.css        # Global styles
│
├── components/
│   ├── charts/            # Chart components (LineChart, BarChart, etc.)
│   ├── dashboard/         # Dashboard layout, sidebar, header
│   ├── tables/            # Data table and list components
│   ├── filters/           # Filter components (date picker, multi-select)
│   ├── shared/            # Shared UI components (Button, Card, Modal, etc.)
│   └── providers/         # Context providers
│
├── features/              # Feature-specific logic (future API integration)
│   ├── sales/
│   ├── products/
│   ├── customers/
│   ├── reports/
│   └── analytics/
│
├── store/                 # Zustand stores
│   └── dashboardStore.js  # Main dashboard state management
│
├── lib/
│   └── utils.js           # Utility functions (formatters, helpers)
│
├── hooks/                 # Custom React hooks
│
├── types/                 # TypeScript types and JSDoc definitions
│
└── mock/
    └── data.js            # Mock data generators
```

## 🛠️ Technologies Used

- **Framework**: Next.js 16.2.7 (App Router)
- **UI Framework**: React 19.2.4
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **Charts**: Recharts 3.8.1
- **Icons**: Lucide React
- **Language**: JavaScript (with JSDoc types)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Gray**: Gray scale (#6b7280)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📊 Mock Data

The application includes comprehensive mock data generators:

- **Daily Sales**: 30 days of sales data
- **Monthly Sales**: 12 months of data
- **Products**: 12 sample products with categories
- **Customers**: 10+ top customers with segments
- **Regions**: 10 Indonesian regions
- **Cities**: 10 major cities
- **Customer Segments**: 5 business segments
- **KPI Metrics**: Revenue, orders, profit, growth
- **Category Distribution**: Product category breakdown
- **Customer Growth**: 12-month trend data
- **Regional Analysis**: Detailed regional metrics
- **And more...** - See `src/mock/data.js` for complete list

## 🎯 Key Components

### Dashboard Layout
- Sidebar navigation with collapsible menu
- Header with quick actions and dark mode toggle
- Responsive main content area

### Charts
- Line Chart - Trend visualization
- Bar Chart - Category comparison
- Area Chart - Volume trends
- Pie/Donut Chart - Distribution
- Composed Chart - Multiple chart types

### Tables
- Data Table - Full-featured with sorting, pagination, search
- Simple Table - Compact table view
- Configurable columns and custom rendering

### Filters
- Date Range Picker - Select custom date ranges
- Multi-Select Filter - Multiple options per category
- Quick Filters - Pre-defined date filters (Today, Week, Month, etc.)
- Advanced Filters Drawer - Comprehensive filtering

## 🚀 Future Integration Points

The project is designed to be easily integrated with:

- **Backend APIs** - Replace mock data with API calls
- **Databases** - PostgreSQL, MySQL, StarRocks, Iceberg
- **Data Warehouses** - BigQuery, Snowflake, Redshift
- **BI Platforms** - Metabase, Looker, Tableau
- **Authentication** - NextAuth, Auth0, Firebase
- **Real-time Data** - WebSockets, Server-Sent Events

## 📝 Usage Examples

### Using the Dashboard
1. Navigate to `/dashboard` for the Executive Dashboard
2. Use quick filters to select time periods
3. Click on chart elements for interactive exploration
4. Export data from any page using the Export button

### Accessing Different Pages
- Sales Performance: `/sales`
- Product Performance: `/products`
- Customer Analytics: `/customers`
- Regional Sales: `/regional`
- Reports: `/reports`
- Data Explorer: `/explorer`
- Settings: `/settings`

## 🔧 Customization

### Adding New Pages
1. Create a new directory in `app/`
2. Add `page.jsx` file
3. Use `DashboardLayout` component for consistent styling
4. Update sidebar navigation in `src/components/dashboard/index.jsx`

### Creating New Charts
1. Create component in `src/components/charts/`
2. Use Recharts components
3. Import in page and pass data

### Modifying Mock Data
1. Edit `src/mock/data.js`
2. Update data generators to match your schema
3. Regenerate data in Zustand store

## 📱 Responsive Design

All components are mobile-first and responsive:
- Mobile devices: Single column layout, stacked cards
- Tablets: 2-3 column layout
- Desktop: Full 3-4 column grid layout

## 🌙 Dark Mode

Toggle dark mode using the moon/sun icon in the header. Dark mode preferences are stored in the Zustand store.

## 📄 License

This project is open source and available for modification and distribution.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for modern analytics platforms
