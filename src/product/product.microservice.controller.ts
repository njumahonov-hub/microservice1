import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('product')
export class ProductMicroserviceController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern("find_all")
  findAll(dto: CreateProductDto) {
    console.log(dto);
    
     return dto
  }
@EventPattern("product_created")
  handleCreate(@Payload() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @EventPattern("product_updated")
  handleUpdate(@Payload() data: any) {
    const { id, ...updateDto } = data;
    return this.productService.update(id, updateDto);
  }

  @EventPattern("product_deleted")
  handleDelete(@Payload() id: string) {
    return this.productService.remove(id);
  }


  @EventPattern("find_one")
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }


}
