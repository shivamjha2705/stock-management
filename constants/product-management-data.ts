import productImage1 from '@/public/assets/strawberry_13643533.png';
import productImage2 from '@/public/assets/vegetables_862860.png';
import { StaticImageData } from 'next/image';

export interface ProductManagement {
  sno: number;
  itemName: string;
  type: string; // Assuming two types for simplicity
  subType: string; // Assuming two types for simplicity
  group: string;
  season: string;
  priority: string;
  roster: string;
  veggieNameInHindi: string;
  // unitQuantity?: number; // in grams
  maxUnit?: number; // in grams
  minUnit?: number; // in grams
  unitQuantity?: number; // in grams
  pieces?: number;
  price?: number;
  available?: string;
  visibility?: string;
  image: StaticImageData;
  description: string;
}

export const ProductManagementData: ProductManagement[] = [
  {
    sno: 1,
    itemName: 'Arvi',
    type: 'Regular Veggie',
    subType: 'Veggie',
    group: 'Veggies',
    season: 'Monsoon',
    priority: '2',
    roster: 'A',
    price: 200,
    veggieNameInHindi: 'अरबी',
    // unitQuantity: 1000,
    maxUnit: 5,
    minUnit: 2,
    unitQuantity: 200,
    available: "Yes",
    visibility: "Customer+Admin",
    image: productImage1,
    description: 'Arvi, also known as taro root, is a starchy root vegetable often used in Indian cuisine. It is high in dietary fiber and offers numerous health benefits.'
  },
  {
    sno: 2,
    itemName: 'Cucumber (Kheera)',
    type: 'Salads',
    subType: 'Veggie',

    group: 'Salads',
    season: 'All',
    priority: '1',
    roster: 'A',
    veggieNameInHindi: 'खीरा',
    unitQuantity: 400,
    minUnit: 2,
    maxUnit: 4,
    price: 100,
    available: "No",
    visibility: "Admin",
    image: productImage2,
    description: 'Cucumber, known as Kheera in Hindi, is a refreshing and hydrating vegetable commonly used in salads. It is low in calories and high in vitamins and minerals.'
  }
];
