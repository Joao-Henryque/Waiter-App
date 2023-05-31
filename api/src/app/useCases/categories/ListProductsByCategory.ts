import { Product } from './../../models/Product';

import HttpException from '../../errors/HttpException';

export default async function ListProductsByCategory(
  categoryId: string
) {
  try {
    const products = await Product
      .find()
      .where('category')
      .equals(categoryId);

    return products;
  } catch {
    throw new HttpException('Error to load products by categoryId');
  }
}
