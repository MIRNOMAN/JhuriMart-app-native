import type { ImageSourcePropType } from 'react-native';

export type Product = { id: string; name: string; store: string; price: number; image: ImageSourcePropType; color?: string; rating?: number; reviews?: number };
export type Category = { id: string; name: string; count: number; image: ImageSourcePropType };

export const products: Product[] = [
  { id: 'mirac-jiz', name: 'The Mirac Jiz', store: 'Lisa Robber', price: 195, color: 'Brown', rating: 4.8, reviews: 20, image: require('../../../../assets/images/catalog/mirac-jiz.png') },
  { id: 'merizq-kiles', name: 'Merizq Kiles', store: 'Gazuna Resika', price: 143.45, color: 'Black', rating: 4.7, reviews: 16, image: require('../../../../assets/images/catalog/merizq-kiles.png') },
  { id: 'bag-box-283', name: 'Bag Box 283', store: 'Lisa Robber', price: 163, color: 'Brown', rating: 4.8, reviews: 20, image: require('../../../../assets/images/catalog/bag-box-283.png') },
  { id: 'box-bignan-992', name: 'Box Bignan 992', store: 'Gazuna Resika', price: 163, color: 'Brown', rating: 4.6, reviews: 18, image: require('../../../../assets/images/catalog/box-bignan-992.png') },
  { id: 'big-bignan-283', name: 'Big Bignan 283', store: 'Gazuna Resika', price: 134, color: 'Brown', rating: 4.9, reviews: 26, image: require('../../../../assets/images/catalog/big-bignan-283.png') },
  { id: 'bog-bag-223', name: 'Bog Bag 223', store: 'Lisa Robber', price: 105, color: 'Black', rating: 4.5, reviews: 12, image: require('../../../../assets/images/catalog/bog-bag-223.png') },
  { id: 'headphone-234', name: 'Box Headphone 234', store: 'Upbox Bag', price: 66, color: 'Black', rating: 4.7, reviews: 31, image: require('../../../../assets/images/catalog/headphone.png') },
  { id: 'box-bag-892', name: 'Box Bag 892', store: 'Upbox Bag', price: 152, color: 'Brown', rating: 4.6, reviews: 14, image: require('../../../../assets/images/catalog/brown-bag.png') },
  { id: 'backpack-1883', name: 'Box Bag Linear 1883', store: 'Upbox Bag', price: 35.25, color: 'Brown', rating: 4.8, reviews: 20, image: require('../../../../assets/images/catalog/backpack-1883.png') },
];

export const categories: Category[] = [
  { id: 'clothes', name: 'Clothes', count: 358, image: require('../../../../assets/images/catalog/category-clothes.png') },
  { id: 'bags', name: 'Bags', count: 160, image: require('../../../../assets/images/catalog/category-bags.png') },
  { id: 'shoes', name: 'Shoes', count: 230, image: require('../../../../assets/images/catalog/category-shoes.png') },
  { id: 'electronics', name: 'Electronics', count: 120, image: require('../../../../assets/images/catalog/category-electronics.png') },
];
