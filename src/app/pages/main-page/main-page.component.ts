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
    const carsCost: number = this.store.carsInGarage.reduce(
      (a, b) => a + b.cost,
      0
    );
    let weaponsCost: number = 0;
    const anyWeaponExist: boolean = this.carsInGarage.some(
      car => car.weapons.length > 0
    );
    if (anyWeaponExist)
      weaponsCost = weaponsCost = this.store.carsInGarage
        .map(car => car.weapons.map(weapon => weapon.cost))
        .reduce((acc, val) => acc.concat(val))
        .reduce((a, b) => a + b);
    else {
      weaponsCost = 0;
    }
    return carsCost + weaponsCost;
  }

  deleteCar(carIndex) {
    this.store.deleteCarFromGarage(carIndex);
  }
}
