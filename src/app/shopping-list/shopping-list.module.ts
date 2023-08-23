import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";


@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,
	],
	imports: [
		RouterModule.forChild([
			{
				path: 'shopping-list',
				component: ShoppingListComponent
			}
		]),
		CommonModule,
		FormsModule,
	]
})

export class ShoppingListModule {
} 