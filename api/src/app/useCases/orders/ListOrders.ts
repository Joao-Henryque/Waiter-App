import { Order } from '../../models/Order';

import HttpException from '../../errors/HttpException';

export default async function ListOrders() {
  try {
    const ASCENDING = 1; // -1 means DESCENDING

    const orders = await Order
      .find()
      .sort({ createdAt: ASCENDING })
      .populate('products.product');

    return orders;
  } catch {
    throw new HttpException('Error to load orders');
  }
}
