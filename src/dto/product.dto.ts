import { ProductEntity } from '../entities/product.entity';

export class ProductDto {
  id: number;
  name: string;
  price: number;
  description?: string;

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