import { Injectable } from '@angular/core';
import { action, computed, observable } from 'mobx';
import { Vehicle, Weapon } from './../types/types';

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

  @action addWeaponToCar(car: Vehicle, weapon: Weapon) {
    this.carsInGarage.forEach(itemCar => {
      if (itemCar === car) itemCar.weapons.push(weapon);
    });
  }

  @action deleteWeaponFromCar(car: Vehicle, weaponIndex: number) {
    this.carsInGarage.forEach(itemCar => {
      if (itemCar === car) itemCar.weapons.splice(weaponIndex, 1);
    });
  }

  @action updateGarage(cars: Vehicle[]) {
    this.carsInGarage = cars;
  }

  saveToLocalStorage() {
    localStorage.setItem('myGarage', JSON.stringify(this.carsInGarage));
    alert('Garage saved');
  }

  getFromLocalStorage() {
    this.updateGarage(JSON.parse(localStorage.getItem('myGarage')));
    alert('Garage loaded');
  }
}
