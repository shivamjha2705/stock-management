// import productImage1 from '@/public/assets/strawberry_13643533.png';
// import productImage2 from '@/public/assets/vegetables_862860.png';
// import { StaticImageData } from 'next/image';

// export interface ProductManagement {
//   sno: number;
//   itemName: string;
//   type: string; // Assuming two types for simplicity
//   subType: string; // Assuming two types for simplicity
//   group: string;
//   season: string;
//   priority: string;
//   roster: string;
//   veggieNameInHindi: string;
//   // unitQuantity?: number; // in grams
//   maxUnit?: number; // in grams
//   minUnit?: number; // in grams
//   unitQuantity?: number; // in grams
//   pieces?: number;
//   price?: number;
//   available?: string;
//   visibility?: string;
//   image: StaticImageData;
//   description: string;
// }

// export const ProductManagementData: ProductManagement[] = [
//   {
//     sno: 1,
//     itemName: 'Arvi',
//     type: 'Regular Veggie',
//     subType: 'Veggie',
//     group: 'Veggies',
//     season: 'Monsoon',
//     priority: '2',
//     roster: 'A',
//     price: 200,
//     veggieNameInHindi: 'अरबी',
//     // unitQuantity: 1000,
//     maxUnit: 5,
//     minUnit: 2,
//     unitQuantity: 200,
//     available: "Yes",
//     visibility: "Customer+Admin",
//     image: productImage1,
//     description: 'Arvi, also known as taro root, is a starchy root vegetable often used in Indian cuisine. It is high in dietary fiber and offers numerous health benefits.'
//   },
//   {
//     sno: 2,
//     itemName: 'Cucumber (Kheera)',
//     type: 'Salads',
//     subType: 'Veggie',

//     group: 'Salads',
//     season: 'All',
//     priority: '1',
//     roster: 'A',
//     veggieNameInHindi: 'खीरा',
//     unitQuantity: 400,
//     minUnit: 2,
//     maxUnit: 4,
//     price: 100,
//     available: "No",
//     visibility: "Admin",
//     image: productImage2,
//     description: 'Cucumber, known as Kheera in Hindi, is a refreshing and hydrating vegetable commonly used in salads. It is low in calories and high in vitamins and minerals.'
//   }
// ];

import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import apiCall from '@/lib/axios';

// Update the interface to match the API response
export interface ProductManagement {
  product_id: string;
  product_name: string;
  category: string;
  product_description: string;
  sku: string;
  cost_price_per_unit: number;
}

// Function to fetch data from the API
// export async function fetchProducts(): Promise<ProductManagement[]> {
//   const response = await fetch('/api/products'); // Adjust the URL to match your API endpoint
//   const data = await response.json();
//   return data;
// }



// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<ProductManagement[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const fetchedProducts = await fetchProducts();
//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProducts();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Product List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Category</th>
//             <th>Description</th>
//             <th>SKU</th>
//             <th>Cost Price per Unit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.product_id}>
//               <td>{product.product_id}</td>
//               <td>{product.product_name}</td>
//               <td>{product.category}</td>
//               <td>{product.product_description}</td>
//               <td>{product.sku}</td>
//               <td>{product.cost_price_per_unit}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;

