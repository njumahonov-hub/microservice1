import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}
 async  create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto)
    return await this.productRepo.save(product) ;
  }

 async   findAll() {
    return await this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({where: {id}})
    return  product ;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({where: {id}})
    return await this.productRepo.update(id, updateProductDto);
  }

async  remove(id: number) {
    return await this.productRepo.delete(id);
  }
}
