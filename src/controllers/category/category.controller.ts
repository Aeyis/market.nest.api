import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryDTO } from '../../dto/category.dto';
import { CreateCategoryDto } from '../../dto/category.form.dto';
import {
    CategoryCreateDtoToEntity,
    CategoryEntityToDto,
} from '../../mappers/category.mapper';
import { CategoryService } from '../../services/category/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly _categoryService: CategoryService) {}

    @Post()
    async create(
        @Body() body: CreateCategoryDto,
    ): Promise<{ data: CategoryDTO }> {
        const newCategory = await this._categoryService.create(
            CategoryCreateDtoToEntity(body),
        );

        const dto = CategoryEntityToDto(newCategory);
        return { data: dto };
    }

    @Get()
    async getAll(): Promise<{ data: CategoryDTO[]; total: number }> {
        const result = await this._categoryService.getAll();
        const dto = result.data.map(CategoryEntityToDto);
        return {
            data: dto,
            total: result.total,
        };
    }
}