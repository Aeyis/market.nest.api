import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductDto, ProductListingDto } from '../../dto/product.dto';
import { CreateProductDto } from '../../dto/product.form.dto';
import {
    productCreateDtoToEntity,
    productEntityToDetailsDto,
    productEntityToListingDto,
} from '../../mappers/product.mapper';
import { ProductService } from '../../services/product/product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly _productService: ProductService) {}

    @Get()
    async getAll(): Promise<{ data: ProductListingDto[]; total: number }> {
        const result = await this._productService.getAll();
        const dto = result.data.map(productEntityToListingDto);
        return { data: dto, total: result.total };
    }

    @Post()
    async create(@Body() body: CreateProductDto): Promise<{ data: ProductDto }> {
        const newEntity = await this._productService.create(
            productCreateDtoToEntity(body),
            body.categoriesId,
        );

        const productDto = productEntityToDetailsDto(newEntity);
        return { data: productDto };
    }
}