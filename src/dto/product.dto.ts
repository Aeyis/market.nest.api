import { ProductEntity } from '../entities/product.entity';
import {CategoryDTO} from "./category.dto";

export class ProductDto {
  id: number;
  name: string;
  price: number;
  description?: string;
  categories: CategoryDTO[];

  constructor(entity: ProductEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.price = entity.price;
    this.description = entity.description;
  }
}

export class ProductListingDto {
  id: number;
  name: string;
  price: number;

  constructor(entity: ProductEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.price = entity.price;
  }
}