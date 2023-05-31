import { Category } from '../../models/Category';

import HttpException from '../../errors/HttpException';

interface CreateCategoryRequest {
  name: string;
  icon: string;
}

export default async function CreateCategory({
  name,
  icon
}: CreateCategoryRequest) {
  try {
    const category = await Category.create({
      name,
      icon
    });

    return category;
  } catch {
    throw new HttpException('Failed to create category');
  }
}
