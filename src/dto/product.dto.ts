import { CategoryDTO } from './category.dto';

export class ProductDto {
  id: number;
  name: string;
  price: number;
  description?: string;
  categories: CategoryDTO[];
}

export class ProductListingDto {
  id: number;
  name: string;
  price: number;
  categories: CategoryDTO[];
}
