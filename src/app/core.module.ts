import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthIntersectorService } from "./auth/auth-intersector.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeService } from "./recipes/recipe.service";
import { AuthGuard } from "./auth/auth.guard";

@NgModule({
	providers: [
		ShoppingListService,
		RecipeService,
		AuthGuard,
		{ // HTTP_INTERCEPTORS should be provided as a multi provider
			provide: HTTP_INTERCEPTORS,
			useClass: AuthIntersectorService,
			multi: true
		},

	]
})

export class CoreModule { }