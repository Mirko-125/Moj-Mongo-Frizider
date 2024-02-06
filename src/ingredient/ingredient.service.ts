import { ConflictException, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  
  constructor(
    @InjectModel('Ingredients') private readonly model: Model<Ingredient>,
  ){}

  async create(createIngredientDto: CreateIngredientDto) {
    if (await this.findOne(createIngredientDto.name)){
      throw new ConflictException("This ingredient already exists!");
    }
    return await new this.model(createIngredientDto).save();
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(name: string) {
    return await this.model.findOne({name}).exec();
  }

  async update(name: string, updateIngredientDto: UpdateIngredientDto) {
    return await this.model.findOneAndUpdate({name}, updateIngredientDto).exec();
  }

  async remove(name: string) {
    return await this.model.findOneAndDelete({name}).exec();
  }
}
