import { Order } from '../../models/Order';


import HttpException from '../../errors/HttpException';

export default async function CancelOrder(
  orderId: string
) {
  try {
    await Order.findByIdAndDelete(orderId);
  } catch {
    throw new HttpException('Failed to cancel order');
  }
}
