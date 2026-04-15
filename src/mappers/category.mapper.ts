import {CategoryEntity} from "../entities/category.entity";
import {CategoryDTO} from "../dto/category.dto";
import {CreateCategoryDto, UpdateCategoryDto} from "../dto/category.form.dto";

//ENtity =>DTO
export function CategoryEntityToDto(entity: CategoryEntity): CategoryDTO{
    const dto= new CategoryDTO();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
}
//CreateDTO => Entity
export function CategoryCreateDtoToEntity(dto: CreateCategoryDto): Partial<CategoryEntity>  {
    const entity = new CategoryEntity();

    entity.name = dto.name;

    return entity;
}
//Update => Entity
export function CategoryUpdateDtoToEntity(
    dto: UpdateCategoryDto,
): Partial<CategoryEntity>{
    const entity = new CategoryEntity();
    entity.name = dto.name;
    return entity;
}