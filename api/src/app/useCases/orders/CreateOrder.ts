import { Order } from '../../models/Order';

import HttpException from '../../errors/HttpException';

interface CreateOrderRequest {
  table: string;
  products: [{
    product: string,
    quantity: number;
  }]
}

export default async function CreateOrder({
  table,
  products
}: CreateOrderRequest) {
  try {
    const order = await Order.create({
      table,
      products
    });

    return order;
  } catch {
    throw new HttpException('Failed to create order');
  }
}
