import { Component } from '@angular/core';
import { computed } from 'mobx';
import { StoreService } from './../../services/store.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private store: StoreService) {}

  @computed get carsInGarage() {
    return this.store.carsInGarage;
  }

  @computed get totalCost() {
    return this.store.carsInGarage.reduce((a, b) => a + b.cost, 0);
  }

  deleteCar(carIndex) {
    this.store.deleteCarFromGarage(carIndex);
  }
}
