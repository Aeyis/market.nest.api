import {Body, Controller, Get, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import { ProductDto, ProductListingDto } from '../../dto/product.dto';
import {CreateProductDto, ProductListingQueryDto} from '../../dto/product.form.dto';
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
    async getAll(
        @Query() query: ProductListingQueryDto,
    ): Promise<{ data: ProductListingDto[]; total: number }> {
        const result = await this._productService.getAll(query);
        const dto = result.data.map(productEntityToListingDto);
        return {
            data:dto,
            total: result.total,
        }
    }

    @Get(":id")
    async getById(@Param('id', ParseIntPipe) id: number): Promise<{ data: ProductDto}> {
        const product = await this._productService.getById(id);
        const dto= productEntityToListingDto(product);
        return { data:dto};
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