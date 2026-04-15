import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { ProductEntity } from '../../entities/product.entity';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { ProductListingQueryDto } from '../../dto/product.form.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly _productRepo: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private readonly _categoryRepo: Repository<CategoryEntity>,
    ) {}

    async getAll(query: ProductListingQueryDto): Promise<{ data: ProductEntity[]; total: number }> {
        const where: FindOptionsWhere<ProductEntity> = {};

        if (query.name) {
            where.name = Like(`%${query.name}%`);
        }

        const result = await this._productRepo.findAndCount({
            where,
            relations: ['categories'],
            skip: query.offset,
            take: query.limit,
        });

        return {
            data: result[0],
            total: result[1],
        };
    }

    async create(
        product: Partial<ProductEntity>,
        categoriesIds: number[],
    ): Promise<ProductEntity> {
        // récupérer toutes les catégories
        const categories = await this._categoryRepo.find({
            where: {
                id: In(categoriesIds),
            },
        });

        // vérifier que tous les ids existent
        if (categories.length != categoriesIds.length) {
            throw new Error('Une catégorie est invalide');
        }

        // on ajoute les catégories au product
        product.categories = categories;

        // save le product
        const newP = await this._productRepo.save(product);

        return newP;
    }
}