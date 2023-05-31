import { Request, Response } from 'express';

import ListProducts from '../useCases/products/ListProducts';
import CreateProduct from '../useCases/products/CreateProduct';

import HttpStatusCode from '../utils/HttpStatusCode';

class ProductController {
  async index(req: Request, res: Response): Promise<Response> {
    const products = await ListProducts();

    return res.status(HttpStatusCode.OK).json(products);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const imagePath = req.file?.filename || '';

    const {
      name,
      description,
      price,
      category,
      ingredients
    } = req.body;

    const product = await CreateProduct({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : []
    });

    return res.status(HttpStatusCode.CREATED).json(product);
  }
}

export default new ProductController();
