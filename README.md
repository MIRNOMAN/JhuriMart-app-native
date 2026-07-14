# JhuriMart — Kutuku eCommerce Mobile App

Production-oriented Expo implementation of the 45-frame Kutuku eCommerce mobile UI kit. The app targets phones from the original 375×812 design baseline and constrains content on tablets for readable, centered layouts.

## Stack

- Expo SDK 57, React Native 0.86, React 19.2, TypeScript
- Expo Router and Expo Vector Icons
- NativeWind/Tailwind plus measured React Native styles
- React Hook Form and Zod
- Zustand
- TanStack React Query and Axios
- Reanimated and Gesture Handler
- React Native SVG and `expo-image`

## Install and run

Node.js 22.13 or later is recommended for Expo SDK 57.

```bash
npm install
npm run start
```

Then press `a`, `i`, or `w` for Android, iOS, or web. Additional checks:

```bash
npm run typecheck
npm run lint
npx expo export --platform web
```

Set `EXPO_PUBLIC_API_URL` to enable the prepared product API query. Without it, the application uses its local typed catalog.

## Architecture

```text
assets/images/
  catalog/             Local catalog and design-derived imagery
  onboarding/          Onboarding photography
src/
  app/                 Thin Expo Router route entries
    (auth)/            Authentication route group
    (tabs)/            Home, orders, favorites, profile tabs
    messages/[id].tsx  Dynamic conversation route
    product/[id].tsx   Dynamic product route
    store/[id].tsx     Dynamic store route
  components/ui/       Shared screen, typography, button, input, header primitives
  constants/           Design tokens and responsive layout constants
  features/
    account/            Settings, profile, security, help, legal
    auth/               Registration, login, verification, recovery
    catalog/            Products, categories, search, store, favorites
    checkout/           Cart, address, payment, card, success
    communication/      Messages, chat, notifications
    home/               Home feed
    onboarding/         Brand splash and onboarding carousel
    orders/             Active/history orders and tracking
  services/api/         Axios client, endpoints, React Query hooks
  store/                Domain-focused Zustand stores
```

Routes only connect Expo Router to feature screens. Domain behavior remains inside `features`, cross-domain UI lives in `components/ui`, and all colors, spacing, radii, typography, and shadows originate in `src/constants/theme.ts`.

## Screen coverage

The implementation covers all 45 supplied frames. Related visual frames are represented as interactive states where appropriate:

- Empty, typing, filled, verification, success, login, forgot-password, and new-password states
- Home/category tabs; search history, results, and filter sheet
- Store detail and two product-detail content variants
- Unselected/selected cart and removable cart v2
- Checkout, address, payment methods, add card, and payment success
- Settings, edit profile, password, language, notification preferences, security, help, legal, and logout modal
- Active/history orders, tracking, favorites, messages, conversation, and notifications

## State and networking

Stores are separated by responsibility: authentication, cart, checkout, wishlist, profile, notification preferences, and theme. The Axios client and endpoint map are intentionally backend-agnostic. TanStack Query hooks are disabled until `EXPO_PUBLIC_API_URL` is supplied, keeping the reference build deterministic and offline-friendly.

## Design notes

- Original reference size: 375×812
- Typeface: Plus Jakarta Sans
- Primary: Kutuku violet
- Supplied design is light-only; the theme store is prepared for a future dark palette without inventing an unsupported dark design.
- Catalog imagery is local, so core screens do not depend on third-party image hosts.

Expo changes frequently. This project follows the exact [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/) required by `AGENTS.md`.
