import { Injectable } from '@angular/core';
import { action, observable } from 'mobx';
import { Upgrade, Vehicle, Weapon } from './../types/types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  @observable carsInGarage: Vehicle[] = [];

  constructor(private toastr: ToastrService) {}

  @action addCarToGarage(car: Vehicle) {
    this.carsInGarage.push(car);
  }

  @action deleteCarFromGarage(car: Vehicle) {
    this.carsInGarage.forEach((item, index) => {
      if (item === car) this.carsInGarage.splice(index, 1);
    });
    this.toastr.success('Car deleted.');
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
    this.toastr.success('Weapon deleted.');
  }

  @action addUpgradeToCar(car: Vehicle, upgrade: Upgrade) {
    this.carsInGarage.forEach(itemCar => {
      if (itemCar === car) itemCar.upgrades.push(upgrade);
    });
  }

  @action deleteUpgradeFromCar(car: Vehicle, upgradeIndex: number) {
    this.carsInGarage.forEach(itemCar => {
      if (itemCar === car) itemCar.upgrades.splice(upgradeIndex, 1);
    });
    this.toastr.success('Upgrade deleted.');
  }

  @action updateGarage(cars: Vehicle[]) {
    this.carsInGarage = cars;
  }

  saveToLocalStorage() {
    localStorage.setItem('myGarage', JSON.stringify(this.carsInGarage));
    this.toastr.success('Garage saved.');
  }

  getFromLocalStorage() {
    this.updateGarage(JSON.parse(localStorage.getItem('myGarage')));
    this.toastr.success('Garage fully loaded.');
  }
}
