import {ProductEntity} from "../entities/product.entity";
import {ProductDto, ProductListingDto} from "../dto/product.dto";
import {CreateProductDto, UpdateProductDto} from "../dto/product.form.dto";
import {CategoryEntityToDto} from "./category.mapper";

// Entity => DTO détail
export function ProductEntityToDto(entity: ProductEntity): ProductDto {
    const dto = new ProductDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.price = entity.price;
    dto.description = entity.description;
    dto.categories = entity.categories.map(CategoryEntityToDto);//transforme les categories entity en DTO grâce à map
    return dto;
}

// Entity => DTO listing (sans description)
export function ProductEntityToListingDto(entity: ProductEntity): ProductListingDto {
    const dto = new ProductListingDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.price = entity.price;
    dto.categories = entity.categories.map(CategoryEntityToDto);
    return dto;
}

// CreateDTO => Entity
export function ProductCreateDtoToEntity(dto: CreateProductDto): Partial<ProductEntity> {
    const entity = new ProductEntity();
    entity.name = dto.name;
    entity.price = dto.price;
    entity.description=dto.description;

    if (dto.description) entity.description = dto.description;
    return entity;
}

// UpdateDTO => Entity
export function ProductUpdateDtoToEntity(dto: UpdateProductDto): Partial<ProductEntity> {
    const entity = new ProductEntity();
    if (dto.name) entity.name = dto.name;
    if (dto.price) entity.price = dto.price;
    if (dto.description) entity.description = dto.description;
    return entity;
}