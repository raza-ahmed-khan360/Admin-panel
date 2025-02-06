'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Order } from '../order';
import { Order as OrderType } from '../types/order';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const ordersPerPage = 5;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch('/api/order');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        setTotalOrders(data.length);
      } else {
        console.error('Failed to fetch orders');
      }
    }
    fetchOrders();
  }, [pathname]);

  function prevPage() {
    setOffset((prev) => Math.max(prev - ordersPerPage, 0));
  }

  function nextPage() {
    setOffset((prev) => Math.min(prev + ordersPerPage, totalOrders));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>View all orders and their details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Total</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(offset, offset + ordersPerPage).map((order) => (
              <Order key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, offset + 1)}-{Math.min(offset + ordersPerPage, totalOrders)}
            </strong>{' '}
            of <strong>{totalOrders}</strong> orders
          </div>
          <div className="flex">
            <Button
              onClick={prevPage}
              variant="ghost"
              size="sm"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={nextPage}
              variant="ghost"
              size="sm"
              disabled={offset + ordersPerPage >= totalOrders}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
