import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';
import { endpoints } from './endpoints';

export type ProductDto = { id: string; name: string; price: number; image: string };
export function useProductsQuery() { return useQuery({ queryKey: ['products'], queryFn: async () => (await apiClient.get<ProductDto[]>(endpoints.products)).data, enabled: Boolean(process.env.EXPO_PUBLIC_API_URL) }); }
