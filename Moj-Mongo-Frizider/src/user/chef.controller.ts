import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateChefDto, UpdateChefDto } from './dto/chef.dto';

@Controller('chef')
export class ChefController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createChefDto: CreateChefDto) {
    return await this.userService.createChef(createChefDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateChefDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
