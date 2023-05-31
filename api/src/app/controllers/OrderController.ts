import { Request, Response } from 'express';

import ListOrders from '../useCases/orders/ListOrders';
import CreateOrder from '../useCases/orders/CreateOrder';
import ChangeOrderStatus from '../useCases/orders/ChangeOrderStatus';
import CancelOrder from '../useCases/orders/CancelOrder';

import HttpStatusCode from '../utils/HttpStatusCode';

class OrderController {
  async index(req: Request, res: Response) {
    const orders = await ListOrders();

    return res.status(HttpStatusCode.OK).json(orders);
  }

  async store(req: Request, res: Response) {
    const { table, products } = req.body;

    const order = await CreateOrder({
      table,
      products
    });

    return res.status(HttpStatusCode.OK).json(order);
  }

  async update(req: Request, res: Response) {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        error: 'OrderId is required'
      });
    }

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION or DONE'
      });
    }

    await ChangeOrderStatus({
      orderId,
      status
    });

    return res.sendStatus(HttpStatusCode.NO_CONTENT);
  }

  async delete(req: Request, res: Response) {
    const { orderId } = req.params;

    await CancelOrder(orderId);

    return res.sendStatus(HttpStatusCode.NO_CONTENT);
  }
}

export default new OrderController();
