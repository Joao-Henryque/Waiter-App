import { Product } from '../../models/Product';

import HttpException from '../../errors/HttpException';

export default async function ListProducts() {
  try {
    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
    throw new HttpException('Error to load products');
  }
}
