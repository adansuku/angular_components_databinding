import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
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
	) { }

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		this.http.put(
			'https://recipe-b7cfa-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
			recipes
		).subscribe(response => {
			console.log(response)
		})
	}

	fetchRecipes() {
		return this.http.get<Recipe[]>('https://recipe-b7cfa-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').subscribe(recipes => {
			this.recipeService.setRecipes(recipes)
		})
	}
}