import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Session, Put } from '@nestjs/common';
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
  async create(@Session() session: UserInfo, @Body() createRecipeDto: CreateRecipeDto) {
    return await this.recipeService.create(session.userId, createRecipeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.recipeService.findOne(id);
  }

  @Get('/getrecommendations/:id')
  async getRecommendations(@Param('id') id: string) {
    return await this.recipeService.getRecommendations(id);
  }

  @Get()
  async getAll(){
    return await this.recipeService.getAll();
  }

  @Put(':id')
  async likePost(@Param('id') id: string, @Session() session: UserInfo) {
    return await this.recipeService.likeRecipe(session.userId, id);
  }

  @Put()
  async findAll(@Body() ingredients: string[]) {
    return await this.recipeService.findAll(ingredients);
  }

  @Patch(':id')
  async update(
    @Session() session: UserInfo,
    @Param('id') id: string, 
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return await this.recipeService.update(session.userId, id, updateRecipeDto);
  }

  @Delete(':id')
  async remove(@Session() session: UserInfo, @Param('id') id: string) {
    return await this.recipeService.remove(session.userId, id);
  }
}
