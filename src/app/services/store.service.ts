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
    car.weapons.push(weapon);
  }

  @action deleteWeaponFromCar(car: Vehicle, weaponIndex: number) {
    car.weapons.splice(weaponIndex, 1);
    this.toastr.success('Weapon deleted.');
  }

  @action addUpgradeToCar(car: Vehicle, upgrade: Upgrade) {
    if (this.checkIfUpgradePossible(car, upgrade)) {
      car.upgrades.push(upgrade);
      this.addUpgradeChangeAttribute(car, upgrade);
    }
  }

  @action deleteUpgradeFromCar(
    car: Vehicle,
    upgradeIndex: number,
    upgrade: Upgrade
  ) {
    car.upgrades.splice(upgradeIndex, 1);
    this.deleteUpgradeChangeAttribute(car, upgrade);
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
    const garageEmpty: Vehicle[] = JSON.parse(localStorage.getItem('myGarage'));
    if (garageEmpty.length <= 0) {
      this.toastr.warning('No vehicles in the garage.');
    } else {
      this.updateGarage(JSON.parse(localStorage.getItem('myGarage')));
      this.toastr.success('Garage fully loaded.');
    }
  }

  deleteLocalStorage() {
    localStorage.setItem('myGarage', JSON.stringify([]));
    this.toastr.success('All vehicles deleted.');
  }

  checkIfUpgradePossible(car: Vehicle, upgrade: Upgrade): boolean {
    switch (upgrade.name) {
      case 'Experimental Nuclear Engine': {
        if (car.weight === 'Lightweight') {
          this.toastr.error('Cannot mount in Lightweight.');
          return false;
        }
        if (
          car.upgrades.some(
            upgrade => upgrade.name === 'Experimental Nuclear Engine'
          )
        ) {
          this.toastr.error('Only 1 Nuclear Engine.');
          return false;
        }
        return true;
      }
      case 'Experimental Teleporter': {
        if (
          car.upgrades.some(
            upgrade => upgrade.name === 'Experimental Teleporter'
          )
        ) {
          this.toastr.error('Only 1 Experimental Teleporter.');
          return false;
        }
        return true;
      }
      case 'Extra Crewmember': {
        if (
          car.upgrades.filter(upgrade => upgrade.name === 'Extra Crewmember')
            .length >= car.crew
        ) {
          this.toastr.error(`Max ${car.crew} crew extra members.`);
          return false;
        }
        return true;
      }
      case 'Tank Tracks': {
        if (car.upgrades.some(upgrade => upgrade.name === 'Tank Tracks')) {
          this.toastr.error('Only 1 Tank Tracks.');
          return false;
        }
        if (
          car.model === 'Tank' ||
          car.model === 'Helicopter' ||
          car.model === 'Gyrocopter'
        ) {
          this.toastr.error(`Can't fit in this vehicle.`);
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  }

  addUpgradeChangeAttribute(car: Vehicle, upgrade: Upgrade): void {
    switch (upgrade.name) {
      case 'Armour Plating': {
        car.hullPoints = car.hullPoints + 2;
        break;
      }
      case 'Experimental Nuclear Engine': {
        car.maxGearModified = car.maxGearModified + 2;
        if (car.maxGearModified > 6) car.maxGearModified = 6;
        break;
      }
      case 'Extra Crewmember': {
        car.crewModified = car.crewModified + 1;
        break;
      }
      case 'Tank Tracks': {
        car.handling = car.handling + 1;
        car.maxGearModified = car.maxGearModified - 1;
        break;
      }

      default:
        break;
    }
  }

  deleteUpgradeChangeAttribute(car: Vehicle, upgrade: Upgrade): void {
    switch (upgrade.name) {
      case 'Armour Plating': {
        car.hullPoints = car.hullPoints - 2;
        break;
      }
      case 'Experimental Nuclear Engine': {
        car.maxGearModified = car.maxGear;
        break;
      }
      case 'Extra Crewmember': {
        car.crewModified = car.crewModified - 1;
        break;
      }
      case 'Tank Tracks': {
        car.handling = car.handling - 1;
        car.maxGearModified = car.maxGearModified + 1;
        break;
      }
      default:
        break;
    }
  }
}
