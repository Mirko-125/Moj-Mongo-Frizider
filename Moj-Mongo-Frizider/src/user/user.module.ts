import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ChefController } from './chef.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseUserSchema } from './entities/base-user.entity';
import { UserSchema } from './entities/user.entity';
import { ChefSchema } from './entities/chef.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BaseUser', schema: BaseUserSchema, discriminators: [
        { name: 'User', schema: UserSchema },
        { name: 'Chef', schema: ChefSchema },
      ]}
    ])
  ],
  controllers: [UserController, ChefController],
  providers: [UserService],
})
export class UserModule {}
