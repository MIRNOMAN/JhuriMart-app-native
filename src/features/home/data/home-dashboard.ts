export type PlatformMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

export type EngineeringPractice = {
  id: string;
  title: string;
  description: string;
};

export const platformMetrics: PlatformMetric[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    value: 'Feature first',
    detail: 'Routes stay thin, reusable code lives in feature and shared modules.',
  },
  {
    id: 'performance',
    label: 'Performance',
    value: 'List ready',
    detail: 'Rendering defaults prefer batching, memoized rows, and stable keys.',
  },
  {
    id: 'scale',
    label: 'Scale',
    value: '100k+ users',
    detail: 'Client work is split, predictable, and ready for API pagination.',
  },
];

export const engineeringPractices: EngineeringPractice[] = [
  {
    id: 'domain-boundaries',
    title: 'Domain boundaries',
    description: 'Keep screen-specific logic inside features and cross-app building blocks in shared.',
  },
  {
    id: 'stable-rendering',
    title: 'Stable rendering',
    description: 'Use memoized components, static data outside render, and virtualized lists for growth.',
  },
  {
    id: 'observability-ready',
    title: 'Observability ready',
    description: 'Central config makes it simple to add logging, analytics, and experiments later.',
  },
];

