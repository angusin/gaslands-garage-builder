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

  @action deleteCarFromGarage(indexInArray: number) {
    this.carsInGarage.splice(indexInArray, 1);
  }
}
