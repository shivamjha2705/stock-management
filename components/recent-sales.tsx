import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { StaticImageData } from "next/image";

interface Sale {
  avatar?: StaticImageData;
  name?: string;
  email?: string;
  amount?: string;
  itemsIncluded?: { itemName: string, quantity: string }[];
}

interface RecentSalesProps {
  sales: Sale[];
}

export function RecentSales({ sales }: RecentSalesProps) {
  return (
    <div className="space-y-3">
      {sales.map((sale, index) => (
        <div className="flex items-center p-3 transition-all duration-200 transform hover:scale-105 hover:bg-red-500" key={index}>
        <Avatar className="h-9 w-9">
            {sale.avatar ? (
              <Image src={sale.avatar} alt="Avatar" />
            ) : (
              <AvatarFallback>
                {sale.name ? sale.name.split(' ').map(n => n[0]).join('') : 'NA'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-4 space-y-1 ">
          <p className="text-sm font-medium leading-none">{sale.name || 'Unnamed'}</p>
{         sale?.email &&    <p className="text-sm text-muted-foreground">{sale.email || 'No email provided'}</p>
}            {sale.itemsIncluded && sale.itemsIncluded.map((item) => (
              <p key={item.itemName} className="text-sm text-muted-foreground">
                {item.itemName}: {item.quantity}
              </p>
            ))}
          </div>
          <div className="ml-auto font-medium">{sale.amount || 'No amount'}</div>
        </div>
      ))}
    </div>
  );
}
