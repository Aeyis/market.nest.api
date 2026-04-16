import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  categoriesId: number[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  sort?: 'name' | 'price';
}

export class ProductListingQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  offset?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
