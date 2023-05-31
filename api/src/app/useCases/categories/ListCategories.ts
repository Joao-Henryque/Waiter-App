import { Category } from '../../models/Category';

import HttpException from '../../errors/HttpException';

export default async function ListCategories() {
  try {
    const categories = await Category.find();

    return categories;
  } catch {
    throw new HttpException('Error to load categories');
  }
}
