import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateChefDto } from './dto/chef.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chef } from './entities/chef.entity';
import { User } from './entities/user.entity';
import { BaseUser } from './entities/base-user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('BaseUser') private readonly baseUserModel: Model<BaseUser>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Chef') private readonly chefModel: Model<Chef>,
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async createChef(createChefDto: CreateChefDto) {
    return await new this.chefModel(createChefDto).save(); 
  }

  async findAll() {
    return await this.baseUserModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
