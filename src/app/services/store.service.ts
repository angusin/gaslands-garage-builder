import { Injectable } from '@angular/core';
import { action, observable } from 'mobx';
import { Vehicle } from './../types/types';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  @observable carsInGarage: Vehicle[] = [];

  constructor() {}

  @action addCarToGarage(car: Vehicle) {
    this.carsInGarage.push(car);
  }

  @action deleteCarFromGarage(car: Vehicle) {
    this.carsInGarage.forEach((item, index) => {
      if (item === car) this.carsInGarage.splice(index, 1);
    });
  }
}
