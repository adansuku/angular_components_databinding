import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('f') slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editeItemIndex: number;
  editeItem: Ingredient;

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.
      subscribe((index: number) => {
        this.editeItemIndex = index;
        this.editMode = true;
        this.editeItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editeItem.name,
          amount: this.editeItem.amount
        })
      });
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updatedIngredient(this.editeItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  onClearForm() {
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
