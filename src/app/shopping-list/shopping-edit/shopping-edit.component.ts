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
  subscription: Subscription;
  editMode = false;
  editeItemIndex: number;
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.
      subscribe((index: number) => {
        this.editeItemIndex = index;
        this.editMode = true;
      });
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
