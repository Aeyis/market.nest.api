import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {MinimarketService} from "../../services/minimarket/minimarket.service";
import {ProductDto, ProductListingDto} from "../../dto/product.dto";
import {CreateProductDto, ProductQueryDto, UpdateProductDto} from "../../dto/product.form.dto";
import {CreateCategoryDto, UpdateCategoryDto} from "../../dto/category.form.dto";
import {CategoryEntity} from "../../entities/category.entity";

@Controller('minimarket')
export class MinimarketController {
    constructor(private readonly minimarketService: MinimarketService) {}

    @Get('products')
    async getProducts(): Promise<ProductListingDto[]> {
        return await this.minimarketService.getProducts();
    }

    @Get('products/:id')
    async getProduct(@Param('id') id: string): Promise<ProductDto | null> {
        return await this.minimarketService.getProductById(+id);
    }

    @Post('products')
    async createProduct(@Body() body: CreateProductDto): Promise<ProductDto> {
        return await this.minimarketService.createProduct(body);
    }

    @Patch('products/:id')
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto): Promise<ProductDto> {
        return await this.minimarketService.updateProduct(+id, body);
    }

    @Delete('products/:id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        await this.minimarketService.deleteProduct(+id);
    }

    @Get('categories')
    async getCategories(): Promise<CategoryEntity[]> {
        return await this.minimarketService.getCategories();
    }

    @Get('categories/:id')
    async getCategory(@Param('id') id: string): Promise<CategoryEntity | null> {
        return await this.minimarketService.getCategoryById(+id);
    }

    @Post('categories')
    async createCategory(@Body() body: CreateCategoryDto): Promise<CategoryEntity> {
        return await this.minimarketService.createCategory(body);
    }

    @Patch('categories/:id')
    async updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto): Promise<CategoryEntity> {
        return await this.minimarketService.updateCategory(+id, body);
    }

    @Delete('categories/:id')
    async deleteCategory(@Param('id') id: string): Promise<void> {
        await this.minimarketService.deleteCategory(+id);
    }
}