import { Request, Response } from 'express';

import ListCategories from '../useCases/categories/ListCategories';
import ListProductsByCategory from '../useCases/categories/ListProductsByCategory';
import CreateCategory from '../useCases/categories/CreateCategory';

import HttpStatusCode from '../utils/HttpStatusCode';

class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await ListCategories();

    return res.status(HttpStatusCode.OK).json(categories);
  }

  async show(req: Request, res: Response) {
    const { categoryId } = req.params;

    if (!categoryId) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        error: 'CategoryId is required'
      });
    }

    const products = await ListProductsByCategory(categoryId);

    return res.status(HttpStatusCode.OK).json(products);
  }

  async store(req: Request, res: Response) {
    const { name, icon } = req.body;

    const category = await CreateCategory({
      name,
      icon
    });

    return res.status(HttpStatusCode.CREATED).json(category);
  }
}

export default new CategoryController();
