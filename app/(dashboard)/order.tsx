import { TableCell, TableRow } from '@/components/ui/table';
import { Order as OrderType } from './types/order';

export function Order({ order }: { order: OrderType }) {
  return (
    <TableRow>
      <TableCell>{order._id}</TableCell>
      <TableCell>{order.customer}</TableCell>
      <TableCell>{order.status}</TableCell>
      <TableCell className="hidden md:table-cell">{order.total}</TableCell>
      <TableCell className="hidden md:table-cell">{new Date(order.date).toLocaleDateString()}</TableCell>
      <TableCell>
        {/* Add any actions here */}
      </TableCell>
    </TableRow>
  );
}
