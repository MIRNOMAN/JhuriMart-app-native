# Simple Remaning

Production-minded Expo app structure for reusable code, clear team ownership, and fast screens as the user base grows.

## Tech baseline

- Expo SDK 57, aligned with the versioned docs in `AGENTS.md`.
- React Native 0.86 and React 19.2.3.
- Expo Router keeps file-based routing in `src/app`.
- TypeScript strict mode is enabled.

## Folder structure

```text
src/
  app/                 Expo Router route entry points only
  features/            Product domains: screens, domain components, data, hooks
    home/
    explore/
  shared/              Cross-app config, primitives, utilities, constants
    config/
    constants/
    ui/
  components/          Existing reusable Expo starter primitives
  constants/           Theme tokens
  hooks/               Shared React hooks
```

## Architecture rules

- Keep `src/app/*` thin. A route should import and render a feature screen.
- Put domain UI in `src/features/<feature>/components`.
- Put data contracts and static screen data in `src/features/<feature>/data`.
- Put code used by multiple features in `src/shared`.
- Keep theme and spacing centralized so UI stays consistent across teams.

## Performance rules for 100k+ users

- Use `FlatList` or another virtualized list for any growing collection.
- Keep list rows memoized and pass stable `keyExtractor` values.
- Keep static data and config outside render paths.
- Add pagination/cursor loading at API boundaries before large feeds launch.
- Use `expo-image` for production images and fixed dimensions to avoid layout shift.
- Avoid heavy work inside screen render; move derived data into memoized selectors or server responses.

## Commands

```bash
npm install
npm run start
npm run typecheck
npm run lint
```

## Expo docs

Before Expo code changes, read the exact versioned docs:

https://docs.expo.dev/versions/v57.0.0/
