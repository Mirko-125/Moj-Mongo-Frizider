import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Session } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ChefGuard } from 'src/user/guards/chef.guard';
import { UserInfo } from 'src/user/dto/UserInfo';

@UseGuards(ChefGuard)
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Session() session: UserInfo, @Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(session.userId, createRecipeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Get()
  findAll(@Body() ingredients: string[]) {
    return this.recipeService.findAll(ingredients);
  }

  @Patch(':id')
  update(
    @Session() session: UserInfo,
    @Param('id') id: string, 
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipeService.update(session.userId, id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Session() session: UserInfo, @Param('id') id: string) {
    return this.recipeService.remove(session.userId, id);
  }
}
