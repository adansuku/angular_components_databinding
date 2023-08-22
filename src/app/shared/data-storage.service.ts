import { Injectable } from "@angular/core";
import { HttpClient, } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
@Injectable({
	providedIn: 'root' // with this is not neccesary to add in app.module.ts
})

export class DataStorageService {
	static storeRecipes() {
		throw new Error('Method not implemented.');
	}
	static subscribe(arg0: () => void) {
		throw new Error('Method not implemented.');
	}
	constructor(
		private http: HttpClient,
		private recipeService: RecipeService,
		private authService: AuthService
	) { }

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		return this.http.put(
			'https://recipe-b7cfa-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
			recipes
		)
	}

	fetchRecipes() {
		return this.http.get<Recipe[]>(
			'https://recipe-b7cfa-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
		).pipe(
			map(recipes => {
				console.log(recipes)
				return recipes.map(recipe => {
					return {
						...recipe,
						ingredients: recipe.ingredients ? recipe.ingredients : []
					}
				})
			}),
			tap(recipes => {
				this.recipeService.setRecipes(recipes)
			})
		)
	}
}