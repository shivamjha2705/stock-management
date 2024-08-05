import { CalendarDateRangePicker } from '@/components/date-range-picker';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/layout/protected-route';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { Button } from '@/components/ui/button';
import itemsImage from '@/public/assets/icons/items.png'
import orderImage from '@/public/assets/icons/order.png'
import shopImage from '@/public/assets/icons/premuim3.png'
import customerImage from '@/public/assets/icons/customers.png'

import shop1 from '@/public/assets/icons/shop1.png'
import shop2 from '@/public/assets/icons/shop2.png'
import shop3 from '@/public/assets/icons/shop3.png'
import shop4 from '@/public/assets/icons/shop4.png'
import shop5 from '@/public/assets/icons/shop5.png'
import premium1 from '@/public/assets/icons/premium1.png'
import premium2 from '@/public/assets/icons/premium2.png'
import premium3 from '@/public/assets/icons/premuim3.png'
import premium4 from '@/public/assets/icons/premuim4.png'
import premium5 from '@/public/assets/icons/premuim5.png'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { AreaChartComp } from '@/components/areaChartComp';
import { DonutComp } from '@/components/donutComp';
import { OrderRecentClient } from '@/components/tables/recent-order-tables/client';
import { Sale, salesData, vegData } from '@/constants/salesData';




export default function page() {


  


  
  // const subscriptionPlans: Sale[] = [
  //   {
  //     avatar: premium1,
  //     name: 'Basic Veggie Pack',
  //     email: 'Includes: Potato - 5 KG, Tomato - 2 KG',
  //     amount: '₹500',
  //   },
  //   {
  //     avatar: premium2,
  //     name: 'Family Veggie Pack',
  //     email: 'Includes: Cucumber - 3 KG, Onion - 5 KG',
  //     amount: '₹1500',
  //   },
  //   {
  //     avatar: premium4,
  //     name: 'Garden Herb Pack',
  //     email: 'Includes: Parsley - 200 Grams, Cilantro - 300 Grams',
  //     amount: '₹800',
  //   },
  //   {
  //     avatar: premium5,
  //     name: 'Root Harvest Pack',
  //     email: 'Includes: Carrot - 5 KG, Beetroot - 3 KG',
  //     amount: '₹1200',
  //   }
  // ];
  

  const cardData = [
    {
      id: 1,
      title: 'Total Items',
      count: 234,
      description: '4 Items newly Added',
      imageSrc: itemsImage,
    },
    {
      id: 2,
      title: 'Total Orders',
      count: 150,
      description: '2 Orders placed today',
      imageSrc: orderImage,
    },
    {
      id: 3,
      title: 'Total Subscription',
      count: '24',
      description: '0 Plans Created today',
      imageSrc: shopImage,
    },
    {
      id: 4,
      title: 'Total Customers',
      count: 1024,
      description: '10 Newly added',
      imageSrc: customerImage,
    },
  ];
  

  // const salesData = [
  //   { avatar: potato, name: 'Potato', email:"₹59/kg",  amount: '1999.00 KG' },
  //   { avatar: tomato, name: 'Tomato',  email:"₹36/kg", amount: '390.00 KG' },
  //   { avatar: cucumber, name: 'Cucumber', email:"₹34/kg",  amount: '299.00 KG' },
  //   { avatar: onion, name: 'Onion', email:"₹20/kg",  amount: '99.00 KG' },
  //   { avatar: pumpkin, name: 'Pumpkin', email:"₹24/kg", amount: '39.00 KG' }
  // ];

 const subscriptionPlans = [
  {
    name: 'Basic Veggie Pack',
    avatar: premium1,
    amount: '₹500',
    itemsIncluded: [
      { itemName: 'Potato', quantity: '5 KG' },
      { itemName: 'Tomato', quantity: '2 KG' }
    ]
  },
  {
    name: 'Family Veggie Pack',
    amount: '₹1500',
    avatar: premium2,
    itemsIncluded: [
      { itemName: 'Cucumber', quantity: '3 KG' },
      { itemName: 'Onion', quantity: '5 KG' }
    ]
  },
  // {
  //   name: 'Premium Veggie Pack',
  //   amount: '₹2500',
  //   avatar: premium3,
  //   itemsIncluded: [
  //     { itemName: 'Onion', quantity: '10 KG' },
  //     { itemName: 'Pumpkin', quantity: '2 KG' }
  //   ]
  // },
  {
    name: "Garden Herb Pack",
    avatar: premium4,
    amount: "₹800",
    "itemsIncluded": [
     { itemName: "Parsley", quantity: "200 Grams" },
      { itemName: "Cilantro", quantity: "300 Grams" }
    ]
  },
  {
    name: "Root Harvest Pack",
    avatar: premium5,
    amount: "₹1200",
    itemsIncluded: [
      { itemName: "Carrot", quantity: "5 KG" },
      { itemName: "Beetroot", quantity: "3 KG" },
    ]
  }
];


  // const storeData = [
  //   { avatar: shop1, name: 'Green Harvest Market', email: '200kg Today', amount: '+₹1,999.00' },
  //   { avatar: shop2, name: 'Organic Greens Hub', email: '45kg Today', amount: '+₹299.00' },
  //   { avatar: shop3, name: 'Farm Fresh Vegetables', email: '47kg Today', amount: '+₹99.00' },
  //   { avatar: shop4, name: 'Veggie Delight Store', email: '20kg Today', amount: '+₹39.00' },
  //   { avatar: shop5, name: 'Fresh Veggie Corner', email: '237kg Today', amount: '+₹39.00' },
  // ];

  return (
    <ProtectedRoute>
      <MainLayout meta={{ title: 'Dashboard' }}>
        {/* <ScrollArea className="h-full"> */}
          <div className="flex-1 min space-y-4 p-4 pt-6 md:p-8">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Hi, Welcome back 👋
              </h2>
              <div className="hidden items-center space-x-2 md:flex">
                <CalendarDateRangePicker />
                <Button>Download</Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              {/* <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Analytics
                </TabsTrigger>
              </TabsList> */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* <Card className='flex justify-between items-center' >
                    <div className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Items
                      </CardTitle>
                    
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">234</div>
                      <p className="text-xs mt-1 text-muted-foreground">
                        4 Items newly Added
                      </p>
                    </CardContent>
                    </div>
                    <Image loading='lazy' className='itemsIcon pe-6' src={itemsImage} alt='' />
                  </Card> */}
                 {cardData?.map((data) => (
        <Card key={data.id} className="flex justify-between items-center  border rounded shadow">
          <div className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {data.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.count}</div>
              <p className="text-xs mt-1 text-muted-foreground">
                {data.description}
              </p>
            </CardContent>
          </div>
          <Image
            loading="lazy"
            className="itemsIcon  object-contain pe-2 h-[90px] w-[70px]"
            src={data.imageSrc}
            alt=""
           
          />
        </Card>
      ))}
                </div>
                
              </TabsContent>
            </Tabs>
          </div>
          <div className="text-white-50 flex lg:flex-nowrap flex-wrap justify-between items-center">
          <AreaChartComp/>
          <DonutComp/>
        </div>


<div className="px-5">
<OrderRecentClient  />

</div>


<div className="flex my-6 justify-between mx-3 lg:flex-nowrap flex-wrap ">
<Card className="w-full me-3">
                    <CardHeader>
                      <CardTitle>Top Selling Items</CardTitle>
                      <CardDescription>
                        You have 265 top items this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <RecentSales sales={vegData} />
                    </CardContent>
                  </Card>
                  <Card className="w-full me-3">
                    <CardHeader>
                      <CardTitle>Top Customers</CardTitle>
                      <CardDescription>
                        You have 265 Top Customers.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <RecentSales sales={salesData} />
                    </CardContent>
                  </Card>
                  
                </div>


                <div className="grid mx-3 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-4 md:col-span-3">
                    <CardHeader>
                      <CardTitle>Popular Subscription</CardTitle>
                      <CardDescription>
                        You have 5 most popular Subscription  .
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <RecentSales sales={subscriptionPlans} />
                    </CardContent>
                  </Card>
                </div>
        {/* </ScrollArea> */}
       
      </MainLayout>
    </ProtectedRoute>
  );
}
