import { ProductDto, ProductListingDto } from '../dto/product.dto';
import { ProductEntity } from '../entities/product.entity';
import { CategoryEntityToDto } from './category.mapper';
import { CreateProductDto, UpdateProductDto } from '../dto/product.form.dto';

export function productEntityToDetailsDto(entity: ProductEntity): ProductDto {
    const dto = new ProductDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.price = entity.price;
    dto.categories = entity.categories.map(CategoryEntityToDto);

    return dto;
}

export function productEntityToListingDto(
    entity: ProductEntity,
): ProductListingDto {
    const dto = new ProductListingDto();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.price = entity.price;
    dto.categories = entity.categories.map(CategoryEntityToDto);

    return dto;
}

// Create -> Entity
export function productCreateDtoToEntity(
    dto: CreateProductDto,
): Partial<ProductEntity> {
    const entity = new ProductEntity();

    entity.name = dto.name;
    entity.description = dto.description;
    entity.price = dto.price;

    return entity;
}

// Update -> Entity
export function productUpdateDtoToEntity(
    dto: UpdateProductDto,
): Partial<ProductEntity> {
    const entity = new ProductEntity();

    entity.name = dto.name;
    entity.description = dto.description;
    entity.price = dto.price;

    return entity;
}