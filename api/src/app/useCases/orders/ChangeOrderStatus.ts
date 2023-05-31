import { Order } from '../../models/Order';

import HttpException from '../../errors/HttpException';

enum Status {
  'WAITING',
  'IN_PRODUCTION',
  'DONE'
}

interface ChangeOrderStatusRequest {
  orderId: string;
  status: Status
}

export default async function ChangeOrderStatus({
  orderId,
  status
}: ChangeOrderStatusRequest) {
  try {
    await Order.findByIdAndUpdate(orderId, { status });
  } catch {
    throw new HttpException('Failed to change order status');
  }
}
