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
    const categories = await this.model.distinct('category').exec();
    const promises = categories.map(async category => {
      const pipeline = [
        {
          $facet: {
            count: [
              { $match: { category: { $eq: category }}},
              { $count: "total" } 
            ],
            names: [
              { $match: { category: { $eq: category }}},
              { $limit: 10 },
              { $project: {_id: 0, name: 1}}
            ]
          }
        }
      ];
  
      const [{ count, names }] = await this.model.aggregate(pipeline).exec();
      const totalCount = count.length > 0 ? count[0].total : 0;
      const nameList = names.map(entry => entry.name);

      return { category, totalCount, names: nameList };
    });
  
    const results = await Promise.all(promises);
    console.log(JSON.stringify(results, null, 2));
    return results;
  }
  


  async findByType() {

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
