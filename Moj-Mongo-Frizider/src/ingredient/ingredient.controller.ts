import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ChefGuard } from 'src/user/guards/chef.guard';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.ingredientService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientService.update(name, updateIngredientDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.ingredientService.remove(name);
  }
}
