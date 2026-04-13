import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductEntity} from "../../entities/product.entity";
import {Repository} from "typeorm";
import {CategoryEntity} from "../../entities/category.entity";

@Injectable()
export class MinimarketService {

    constructor (
        @InjectRepository(ProductEntity)
        private readonly _productRepository: Repository<ProductEntity>,

        @InjectRepository(CategoryEntity)
        private readonly _categoryRepository: Repository<CategoryEntity>,
    ) {}

    async getProducts (): Promise<ProductEntity[]> {
        return this._productRepository.find();
    }

    async getProductById (id: number): Promise<ProductEntity | null> {
        return this._productRepository.findOne({where : { id }});
    }

    async createProduct ( product: ProductEntity): Promise<ProductEntity> {
        return this._productRepository.save(product)
    }

    async updateProduct (id: number, product: ProductEntity): Promise<ProductEntity> {
        return this._productRepository.save({ ...product, id })
    }
    async deleteProduct (id: number): Promise<void> {
        await this._productRepository.delete(id)
    }

    async getCategories (): Promise<CategoryEntity[]> {
        return this._categoryRepository.find();
    }

    async getCategoryById (id: number): Promise<CategoryEntity | null> {
        return this._categoryRepository.findOne({ where: { id } });
    }

    async createCategory (category: CategoryEntity): Promise<CategoryEntity> {
        return this._categoryRepository.save(category);
    }

    async updateCategory (id: number, category: CategoryEntity): Promise<CategoryEntity> {
        return this._categoryRepository.save({ ...category, id });
    }

    async deleteCategory (id: number): Promise<void> {
        await this._categoryRepository.delete(id);
    }
}
