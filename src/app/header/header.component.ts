import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() selectedFeature = new EventEmitter<string>();

  constructor(private dataStorage: DataStorageService) { }

  onSelect(feature: string) {
    this.selectedFeature.emit(feature)
  }

  onSaveData() {
    this.dataStorage.storeRecipes()
    // DataStorageService.subscribe(response => {
    //   console.log(response)
    // })
  }

  onFetchData() {
    this.dataStorage.fetchRecipes()
  }
}
