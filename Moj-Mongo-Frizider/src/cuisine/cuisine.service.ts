import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCuisineDto } from './dto/create-cuisine.dto';
import { UpdateCuisineDto } from './dto/update-cuisine.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cuisine } from './entities/cuisine.entity';

@Injectable()
export class CuisineService {
  constructor(
    @InjectModel('Cuisine') private readonly model: Model<Cuisine>,
  ){}

  async create(createCuisineDto: CreateCuisineDto) {
    if (await this.model.findOne({name: createCuisineDto.name})) {
      throw new ConflictException("This cuisine already exists!");
    }
    return await new this.model(createCuisineDto).save();
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, updateCuisineDto: UpdateCuisineDto) {
    return await this.model.findByIdAndUpdate(id, updateCuisineDto, { new: true });
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
