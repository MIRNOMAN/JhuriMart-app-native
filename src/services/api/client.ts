import { create } from 'axios';
export const apiClient = create({ baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com', timeout: 12_000, headers: { Accept: 'application/json' } });
