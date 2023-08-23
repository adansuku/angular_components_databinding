import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,
	],
	imports: [
		FormsModule,
		RouterModule.forChild([
			{
				path: 'shopping-list',
				component: ShoppingListComponent
			}
		]),
		SharedModule
	]
})

export class ShoppingListModule {
} 