export type ScaleTopic = {
  id: string;
  title: string;
  summary: string;
  owner: 'app' | 'platform' | 'backend' | 'product';
};

export const scalePlaybook: ScaleTopic[] = [
  {
    id: 'feature-ownership',
    title: 'Feature ownership',
    summary: 'Each product area can own screens, components, hooks, and data contracts together.',
    owner: 'app',
  },
  {
    id: 'shared-ui',
    title: 'Shared UI system',
    summary: 'Themed primitives stay reusable while feature components stay close to their domain.',
    owner: 'platform',
  },
  {
    id: 'virtualized-lists',
    title: 'Virtualized lists',
    summary: 'Use FlatList defaults for feed-like screens so large datasets do not block the JS thread.',
    owner: 'app',
  },
  {
    id: 'api-pagination',
    title: 'API pagination',
    summary: 'Design screens around cursors, partial loading, and cache-friendly list updates.',
    owner: 'backend',
  },
  {
    id: 'image-budget',
    title: 'Image budget',
    summary: 'Prefer expo-image and fixed dimensions to avoid layout shift and expensive decoding.',
    owner: 'platform',
  },
  {
    id: 'analytics',
    title: 'Analytics hooks',
    summary: 'Track high-value events at screen boundaries without scattering vendor code everywhere.',
    owner: 'product',
  },
];

