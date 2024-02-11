import { Controller, Get, Post, Body, Patch, Param, Delete, Session, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LogUserDto, UpdateUserDto } from './dto/user.dto';
import { UserInfo } from './dto/UserInfo';
import { Chef } from './entities/chef.entity';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Post('login')
  async logIn(@Body() logDto: LogUserDto, @Session() session: UserInfo){
    const user = await this.userService.logIn(logDto);
    if (!user) {
      throw new NotFoundException('User not found');
    } 
    session.userId = user._id;
    session.isChef = user.userType === "Chef";
    return user;
  }

  @Post('logout')
  async logOut(@Body() logDto: LogUserDto, @Session() session: UserInfo){
    session.userId = null
    session.isChef = null;
    return session;
  }

  @Get('getwithrecipes/:name')
  async getChefWithRecipes(@Param('name') name: string){
    console.log("yes");
    return await this.userService.getChefWithRecipes(name);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.userService.findOneByName(name);
  }
  @Get('byid/:id')
  async findOneWithId(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Patch()
  async update(@Session() session: UserInfo, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(session.userId, updateUserDto);
  }

  @Delete()
  remove(@Session() session: UserInfo) {
    return this.userService.remove(session.userId);
  }
}
