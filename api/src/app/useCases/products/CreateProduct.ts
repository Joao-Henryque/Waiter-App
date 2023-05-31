import { Product } from '../../models/Product';

import HttpException from '../../errors/HttpException';

interface CreateProductRequest {
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string
  ingredients: [{
    name: string,
    icon: string
  }]
}

export default async function CreateProduct({
  name,
  description,
  imagePath,
  price,
  category,
  ingredients
}: CreateProductRequest) {
  try {
    const product = await Product.create({
      name,
      description,
      imagePath,
      price,
      category,
      ingredients
    });

    return product;
  } catch {
    throw new HttpException('Failed to create product');
  }
}
