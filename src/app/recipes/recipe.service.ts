import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://recetinas.com/wp-content/uploads/2018/07/bocadillo-caprese-casero.jpg',
    [
      new Ingredient('meet', 1),
      new Ingredient('cheese', 2)
      ]),
    new Recipe(
      'A Test Recipe2',
      'This is simply a test',
      'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/w_1000,h_684,c_limit/the-ultimate-hamburger.jpg',
    [
      new Ingredient('ham', 3),
      new Ingredient('chocolate', 2)
    ])

  ];
  
  constructor(private shopingListService: ShoppingListService){}
  
  getRecipes() {
    return this.recipes.slice();
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopingListService.addIngredients(ingredients);
	}
}
