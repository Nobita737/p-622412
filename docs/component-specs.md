
# Component Library Specifications

## Design Tokens

### Colors (Blue & White Theme)
```typescript
export const colors = {
  primary: {
    50: '#f0f7ff',
    100: '#e0efff', 
    200: '#b8dcff',
    300: '#7bb8ff',
    400: '#3693ff',
    500: '#0066CC', // Accent blue
    600: '#0052a3',
    700: '#004085',
    800: '#003366',
    900: '#1A3E5C', // Deep blue
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#f0fdf4',
    500: '#059669',
    700: '#047857',
  },
  warning: {
    50: '#fffbeb',
    500: '#d97706',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    500: '#dc2626',
    700: '#b91c1c',
  }
};
```

### Typography
```typescript
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  }
};
```

### Spacing & Layout
```typescript
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

export const shadows = {
  card: '0 4px 6px -1px rgba(26, 62, 92, 0.1), 0 2px 4px -1px rgba(26, 62, 92, 0.06)',
  'card-hover': '0 10px 15px -3px rgba(26, 62, 92, 0.1), 0 4px 6px -2px rgba(26, 62, 92, 0.05)',
  elevation: '0 20px 25px -5px rgba(26, 62, 92, 0.1), 0 10px 10px -5px rgba(26, 62, 92, 0.04)',
};
```

## Core Components

### KpiCard
**Purpose**: Display key performance indicators with interactive features.

**Props:**
```typescript
interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  sparklineData?: number[];
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
  formatValue?: (value: string | number) => string;
}
```

**Features:**
- Hover elevation effect
- Click-to-expand functionality
- Integrated sparkline charts
- Trend indicators with directional colors
- Tooltip support
- Responsive design

### AlertBanner
**Purpose**: Display system alerts and notifications.

**Props:**
```typescript
interface AlertBannerProps {
  type: "error" | "warning" | "success" | "info";
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  dismissible?: boolean;
  className?: string;
}
```

**Features:**
- Type-based styling and icons
- Action button integration
- Dismissible with animation
- Accessibility compliant
- Auto-dismiss option

### EnhancedTable
**Purpose**: Data tables with advanced features.

**Props:**
```typescript
interface EnhancedTableProps {
  columns: Column[];
  data: any[];
  searchable?: boolean;
  filterable?: boolean;
  stickyHeader?: boolean;
  zebraStripes?: boolean;
  onSearch?: (query: string) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  renderActions?: (row: any) => React.ReactNode;
  className?: string;
}
```

**Features:**
- Sticky headers for large datasets
- Search and filter capabilities
- Sortable columns
- Row-level actions
- Responsive design with mobile adaptations
- Zebra striping for readability

### QuickActionsToolbar
**Purpose**: Fixed floating action toolbar.

**Props:**
```typescript
interface QuickActionsToolbarProps {
  onLaunchCampaign?: () => void;
  onExportReport?: () => void;
  onAddFunds?: () => void;
  className?: string;
}
```

**Features:**
- Fixed positioning with z-index management
- Contextual actions based on current page
- Smooth animations
- Responsive hiding on mobile when appropriate

## Chart Components

### InteractiveLineChart
**Purpose**: Line charts with click-to-filter functionality.

**Props:**
```typescript
interface InteractiveLineChartProps {
  data: ChartDataPoint[];
  xAxisKey: string;
  lines: LineConfig[];
  onDataPointClick?: (data: any) => void;
  height?: number;
  showTooltip?: boolean;
  className?: string;
}
```

### SparklineChart
**Purpose**: Minimal trend indicators for cards.

**Props:**
```typescript
interface SparklineChartProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  className?: string;
}
```

## Layout Components

### DashboardGrid
**Purpose**: Responsive grid system for dashboard layouts.

**Props:**
```typescript
interface DashboardGridProps {
  children: React.ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
  className?: string;
}
```

### SectionHeader
**Purpose**: Consistent section headers with optional actions.

**Props:**
```typescript
interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}
```

## State Management

### Global State Structure
```typescript
interface AppState {
  user: UserState;
  campaigns: CampaignsState;
  creators: CreatorsState;
  payments: PaymentsState;
  alerts: AlertsState;
  ui: UIState;
}

interface UserState {
  profile: UserProfile | null;
  permissions: Permission[];
  preferences: UserPreferences;
  isAuthenticated: boolean;
}

interface CampaignsState {
  list: Campaign[];
  selected: Campaign | null;
  filters: CampaignFilters;
  loading: boolean;
  error: string | null;
}
```

### Custom Hooks

#### useCampaigns
```typescript
export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async (filters?: CampaignFilters) => {
    // Implementation
  }, []);

  const updateCampaign = useCallback(async (id: string, updates: Partial<Campaign>) => {
    // Implementation
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    updateCampaign,
    pauseCampaign,
    resumeCampaign,
    cloneCampaign,
  };
};
```

#### useRealtimeUpdates
```typescript
export const useRealtimeUpdates = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // WebSocket connection logic
  }, []);

  const subscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    // Event subscription logic
  }, [socket]);

  return { connected, subscribe, disconnect };
};
```

## Performance Optimization

### Code Splitting Strategy
```typescript
// Route-based splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const Creators = lazy(() => import('./pages/Creators'));

// Component-based splitting for heavy components
const ChartComponent = lazy(() => import('./components/Charts/InteractiveChart'));
```

### Memoization Patterns
```typescript
// Expensive calculations
const memoizedMetrics = useMemo(() => {
  return calculateCampaignMetrics(campaigns, timeRange);
}, [campaigns, timeRange]);

// Component memoization
export const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});
```

### Virtual Scrolling for Large Lists
```typescript
// For creator lists and large tables
import { FixedSizeList as List } from 'react-window';

const VirtualizedCreatorList = ({ creators }) => (
  <List
    height={600}
    itemCount={creators.length}
    itemSize={80}
    itemData={creators}
  >
    {CreatorRow}
  </List>
);
```

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- Color contrast ratio ≥ 4.5:1 for normal text
- Color contrast ratio ≥ 3:1 for large text
- Focus indicators for all interactive elements
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility

### Implementation Examples
```typescript
// Focus management
const TrapFocus = ({ children, active }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (active && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      // Focus trap implementation
    }
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
};

// Screen reader announcements
const useAnnouncement = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }, []);

  return { announce };
};
```
