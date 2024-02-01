import { Injectable } from '@nestjs/common';
import { CreateCuisineDto } from './dto/create-cuisine.dto';
import { UpdateCuisineDto } from './dto/update-cuisine.dto';

@Injectable()
export class CuisineService {
  create(createCuisineDto: CreateCuisineDto) {
    return 'This action adds a new cuisine';
  }

  findAll() {
    return `This action returns all cuisine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuisine`;
  }

  update(id: number, updateCuisineDto: UpdateCuisineDto) {
    return `This action updates a #${id} cuisine`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuisine`;
  }
}
