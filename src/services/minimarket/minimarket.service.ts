import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../entities/product.entity";
import {Repository} from "typeorm";
import {CategoryEntity} from "../../entities/category.entity";
import {ProductDto, ProductListingDto} from "../../dto/product.dto";
import {CreateProductDto, UpdateProductDto} from "../../dto/product.form.dto";
import {CreateCategoryDto, UpdateCategoryDto} from "../../dto/category.form.dto";

@Injectable()
export class MinimarketService {

    constructor (
        @InjectRepository(ProductEntity)
        private readonly _productRepository: Repository<ProductEntity>,

        @InjectRepository(CategoryEntity)
        private readonly _categoryRepository: Repository<CategoryEntity>,
    ) {}

    async getProducts (): Promise<ProductListingDto[]> {
        const products = await this._productRepository.find();
        return products.map(p => new ProductListingDto(p));
    }

    async getProductById (id: number): Promise<ProductDto | null> {
        const product = await this._productRepository.findOne({where : { id }});
        return product ? new ProductDto(product) : null;
    }

    async createProduct (dto: CreateProductDto): Promise<ProductDto> {
        const product = this._productRepository.create(dto);
        const saved = await this._productRepository.save(product);
        return new ProductDto(saved);
    }

    async updateProduct (id: number, dto: UpdateProductDto): Promise<ProductDto> {
        const saved = await this._productRepository.save({ ...dto, id });
        return new ProductDto(saved);
    }

    async deleteProduct (id: number): Promise<void> {
        await this._productRepository.delete(id);
    }

    async getCategories (): Promise<CategoryEntity[]> {
        return this._categoryRepository.find();
    }

    async getCategoryById (id: number): Promise<CategoryEntity | null> {
        return this._categoryRepository.findOne({ where: { id } });
    }

    async createCategory (dto: CreateCategoryDto): Promise<CategoryEntity> {
        const category = this._categoryRepository.create(dto);
        return this._categoryRepository.save(category);
    }

    async updateCategory (id: number, dto: UpdateCategoryDto): Promise<CategoryEntity> {
        return this._categoryRepository.save({ ...dto, id });
    }

    async deleteCategory (id: number): Promise<void> {
        await this._categoryRepository.delete(id);
    }
}