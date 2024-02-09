import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { CreateCuisineDto } from './dto/create-cuisine.dto';
import { UpdateCuisineDto } from './dto/update-cuisine.dto';
import { ChefGuard } from 'src/user/guards/chef.guard';

@UseGuards(ChefGuard)
@Controller('cuisine')
export class CuisineController {
  constructor(private readonly cuisineService: CuisineService) {}

  @Post()
  create(@Body() createCuisineDto: CreateCuisineDto) {
    return this.cuisineService.create(createCuisineDto);
  }

  @Get()
  findAll() {
    return this.cuisineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuisineService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuisineDto: UpdateCuisineDto) {
    return this.cuisineService.update(id, updateCuisineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuisineService.remove(id);
  }
}
