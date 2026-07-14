# Architecture decisions

## Navigation

Expo Router owns navigation. Route files contain no business logic and render feature screens. Dynamic route parameters identify products, stores, and conversations; interactive variants such as search filtering and order history remain local screen state.

## Design system

`src/constants/theme.ts` is the sole design-token source. Shared primitives encode typography, safe areas, tablet width constraints, focus/error states, and press animation. NativeWind is configured for utility styling and future composition; measured screens use `StyleSheet` where exact geometry is clearer.

## State boundaries

- `auth-store`: persisted session and onboarding status
- `cart-store`: selections, quantities, removal, totals inputs
- `checkout-store`: address, payment method, card summary
- `wishlist-store`: favorite product identifiers
- `profile-store`: editable profile and language
- `notification-store`: preference switches
- `theme-store`: appearance preference

## Data layer

Static data is typed and colocated with its feature. `services/api/client.ts` provides a configurable Axios instance. Endpoint constants and TanStack Query hooks can replace local repositories without changing screen components.

## Responsive behavior

The UI uses flexible grids and window-derived card widths on phones. `AppScreen` centers and constrains content on displays at least 600 points wide. Scroll containers and bottom actions protect small-height devices while safe-area insets handle cutouts and home indicators.

## Quality gates

Run `npm run lint`, `npm run typecheck`, and a production `expo export` before release. Growing server-backed collections should move from `ScrollView` to paginated `FlatList`/FlashList when real data replaces the small reference fixtures.
