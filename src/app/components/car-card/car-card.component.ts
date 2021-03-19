import { Component, OnInit, Input } from '@angular/core';
import { Vehicle, Weapon } from '../../types/types';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit {
  @Input() vehicle: Vehicle;
  modalIsActive: boolean = false;

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  deleteCar() {
    this.store.deleteCarFromGarage(this.vehicle);
  }

  addWeaponToCar(weapon: Weapon): void {
    this.checkIfSlotsComplete(weapon.slots)
      ? alert('No free slots for this weapon.')
      : this.store.addWeaponToCar(this.vehicle, weapon);
    this.toggleModal();
  }

  deleteWeapon(weaponIndex: number): void {
    this.store.deleteWeaponFromCar(this.vehicle, weaponIndex);
  }

  getWeightCharacter(weight: string): string {
    switch (weight) {
      case 'Lightweight':
        return 'L';
      case 'Middleweight':
        return 'M';
      case 'Heavyweight':
        return 'H';
      default:
        break;
    }
  }

  /*   getCarTotalCost(): number {
    const weaponsCost: number =
      this.vehicle.weapons.length > 0
        ? this.vehicle.weapons.reduce((a, b) => a + b.cost, 0)
        : 0;
    return this.vehicle.cost + weaponsCost;
  } */

  checkIfSlotsComplete(weaponToAddSlot?: number): boolean {
    let slotsOccupied: number = this.vehicle.weapons.reduce(
      (a, b) => a + b.slots,
      0
    );
    if (weaponToAddSlot) {
      slotsOccupied = slotsOccupied + weaponToAddSlot;
    }
    return Boolean(slotsOccupied > this.vehicle.buildSlots);
  }

  getSlotsFilled(): number {
    return this.vehicle.weapons.reduce((a, b) => a + b.slots, 0);
  }

  toggleModal(): void {
    this.modalIsActive = !this.modalIsActive;
  }
}
