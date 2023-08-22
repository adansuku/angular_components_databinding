import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

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

  constructor(private shopingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.refreshRecipesListChanged()
  }
  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(id: number) {
    return this.recipes[id]
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.refreshRecipesListChanged()
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.refreshRecipesListChanged()
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopingListService.addIngredients(ingredients)
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.refreshRecipesListChanged();
  }

  private refreshRecipesListChanged() {
    this.recipesChanged.next(this.recipes.slice())
  }
}
