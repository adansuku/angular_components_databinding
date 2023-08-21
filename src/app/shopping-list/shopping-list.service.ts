import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
	// ingredientsChanged = new EventEmitter<Ingredient[]>();
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10),
	];

	getIngredient(index: number) {
		return this.ingredients[index];
	}

	getIngredients() {
		return this.ingredients.slice();
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.updatedIngredientsListCopy(this.ingredients)
	}

	addIngredients(ingredients: Ingredient[]) {
		// Not! a lot of events!
		// for (let ingredient of ingredients) {
		// 	this.addIngredient(ingredient)
		// }
		this.ingredients.push(...ingredients)
		this.updatedIngredientsListCopy(this.ingredients)
	}

	updatedIngredient(index: number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
		this.updatedIngredientsListCopy(this.ingredients)
	}

	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
		this.updatedIngredientsListCopy(this.ingredients)
	}

	// notify change on list
	updatedIngredientsListCopy(ingredients: Ingredient[]) {
		this.ingredientsChanged.next(this.ingredients.slice());
	}



}