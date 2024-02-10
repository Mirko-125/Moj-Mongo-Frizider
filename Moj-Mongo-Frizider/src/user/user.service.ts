import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chef } from './entities/chef.entity';
import { User } from './entities/user.entity';
import { BaseUser } from './entities/base-user.entity';
import { Model } from 'mongoose';
import { CreateUserDto, LogUserDto, UpdateUserDto } from './dto/user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('BaseUser') private readonly baseUserModel: Model<BaseUser>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Chef') private readonly chefModel: Model<Chef>,
  ){}

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  
  async createUser(dto: CreateUserDto) {
    if (await this.findOneByEmail(dto.email)){
      throw new ConflictException("Email already in use");
    }
    if (await this.findOneByName(dto.name)){
      throw new ConflictException("Name already in use");
    }
    const { isChef, ...userEntity } = dto;
    if (isChef) {
      return await new this.chefModel(userEntity).save(); 
    }
    return await new this.userModel(userEntity).save();
  }

  async addRecipeToChef(chefId: string, recipeId: string){
    await this.chefModel.findByIdAndUpdate(chefId, { $addToSet: { recipes: new ObjectId(recipeId) }});
  }

  async addLiked(userId: string, recipeId: string){
    await this.userModel.findByIdAndUpdate(userId, { $addToSet: { liked: new ObjectId(recipeId) }});
  }

  async getChefWithRecipes(name: string){
    console.log(name);
    const chef = this.chefModel.findOne({name}).populate({path: 'recipes', model: 'Recipe'}).exec();
    console.log(chef)
    return chef;
  }

  async removeRecipeFromChef(chefId: string, recipeId: string){
    await this.chefModel.findByIdAndDelete(chefId, { $pull: { recipes: recipeId }});
  }

  async logIn(dto: LogUserDto) {
    const user = await this.baseUserModel.findOne({email: dto.email, password: dto.password}).exec();
    return user;
  }

  async findAll() {
    return await this.baseUserModel.find().lean().exec();
  }

  async findOneByName(name: string) {
    return await this.baseUserModel.findOne({name: name}).exec();
  }

  async findById(id: string) {
    return await this.baseUserModel.findById(id).exec();
  }

  async findOneByEmail(email: string) {
    return await this.baseUserModel.findOne({email}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = (await this.findById(id));
    if (!user){
      throw new NotFoundException("User not found");
    }
    const updatedUser = {...user, ...updateUserDto}
    return await new this.chefModel(updatedUser).save();
  }

  async remove(id: string) {
    return await this.baseUserModel.findByIdAndDelete(id).exec();
  }
}
