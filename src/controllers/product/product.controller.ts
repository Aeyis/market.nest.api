import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, } from '@nestjs/common';
import { ProductDto, ProductListingDto } from '../../dto/product.dto';
import { CreateProductDto, ProductListingQueryDto, UpdateProductDto, } from '../../dto/product.form.dto';
import {
  productCreateDtoToEntity,
  productEntityToDetailsDto,
  productEntityToListingDto,
  productUpdateDtoToEntity,
} from '../../mappers/product.mapper';
import { ProductService } from '../../services/product/product.service';
import { UserRole } from '../../enums/user-role.enum';
import { RequireRole } from '../../guards/require-role/require-role.decorator';

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
      data: dto,
      total: result.total,
    };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: ProductDto }> {
    const product = await this._productService.getById(id);
    const dto = productEntityToListingDto(product);
    return { data: dto };
  }

  @RequireRole(UserRole.Admin)
  @Post()
  async create(@Body() body: CreateProductDto): Promise<{ data: ProductDto }> {
    const newEntity = await this._productService.create(
      productCreateDtoToEntity(body),
      body.categoriesId,
    );

    const productDto = productEntityToDetailsDto(newEntity);
    return { data: productDto };
  }

  @RequireRole(UserRole.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._productService.delete(id);
  }

  @RequireRole(UserRole.Admin, UserRole.Manager)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ): Promise<{ data: ProductDto }> {
    const updated = await this._productService.update(
      id,
      productUpdateDtoToEntity(body),
    );
    return { data: productEntityToDetailsDto(updated) };
  }
}
