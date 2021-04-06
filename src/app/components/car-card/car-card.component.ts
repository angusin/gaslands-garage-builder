import { Component, OnInit, Input } from '@angular/core';
import { Upgrade, Vehicle, Weapon } from '../../types/types';
import { StoreService } from '../../services/store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit {
  @Input() vehicle: Vehicle;
  weaponModalIsActive: boolean = false;
  upgradeModalIsActive: boolean = false;

  constructor(private store: StoreService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  deleteCar() {
    this.store.deleteCarFromGarage(this.vehicle);
  }

  addWeaponToCar(weapon: Weapon): void {
    this.checkIfSlotsComplete(weapon.slots)
      ? this.toastr.warning('No free slots for this weapon.')
      : this.store.addWeaponToCar(this.vehicle, weapon);
    this.toggleWeaponModal();
  }

  addUpgradeToCar(upgrade: Upgrade): void {
    this.checkIfSlotsComplete(upgrade.slots)
      ? this.toastr.warning('No free slots for this upgrade.')
      : this.store.addUpgradeToCar(this.vehicle, upgrade);
    this.toggleUpgradeModal();
  }

  deleteWeapon(weaponIndex: number): void {
    this.store.deleteWeaponFromCar(this.vehicle, weaponIndex);
  }

  deleteUpgrade(upgradeIndex: number, upgrade: Upgrade): void {
    this.store.deleteUpgradeFromCar(this.vehicle, upgradeIndex, upgrade);
  }

  checkIfSlotsComplete(itemToAddSlot?: number): boolean {
    let slotsOccupied: number =
      this.vehicle.weapons.reduce((a, b) => a + b.slots, 0) +
      this.vehicle.upgrades.reduce((a, b) => a + b.slots, 0);
    if (itemToAddSlot) {
      slotsOccupied = slotsOccupied + itemToAddSlot;
    }
    return Boolean(slotsOccupied > this.vehicle.buildSlots);
  }

  getSlotsFilled(): number {
    const weaponSlots: number = this.vehicle.weapons.reduce(
      (a, b) => a + b.slots,
      0
    );
    const upgradeSlots: number = this.vehicle.upgrades.reduce(
      (a, b) => a + b.slots,
      0
    );
    return weaponSlots + upgradeSlots;
  }

  toggleWeaponModal(): void {
    this.weaponModalIsActive = !this.weaponModalIsActive;
  }

  toggleUpgradeModal(): void {
    this.upgradeModalIsActive = !this.upgradeModalIsActive;
  }

  deactivateModals(state) {
    this.weaponModalIsActive = false;
    this.upgradeModalIsActive = false;
  }
}
