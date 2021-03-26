import { Component } from '@angular/core';
import { computed } from 'mobx';
import { StoreService } from './../../services/store.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Vehicle } from 'src/app/types/types';

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
      weaponsCost = this.store.carsInGarage
        .map(car => car.weapons.map(weapon => weapon.cost))
        .reduce((acc, val) => acc.concat(val))
        .reduce((a, b) => a + b);
    else {
      weaponsCost = 0;
    }
    let upgradesCost: number = 0;
    const anyUpgradeExist: boolean = this.carsInGarage.some(
      car => car.upgrades.length > 0
    );
    if (anyUpgradeExist)
      upgradesCost = this.store.carsInGarage
        .map(car => car.upgrades.map(upgrade => upgrade.cost))
        .reduce((acc, val) => acc.concat(val))
        .reduce((a, b) => a + b);
    else {
      upgradesCost = 0;
    }
    return carsCost + weaponsCost + upgradesCost;
  }

  deleteCar(carIndex) {
    this.store.deleteCarFromGarage(carIndex);
  }

  saveToLocalStorage() {
    this.store.saveToLocalStorage();
  }

  getFromLocalStorage() {
    this.store.getFromLocalStorage();
  }

  deleteEverything() {
    this.store.carsInGarage = [];
    this.store.deleteLocalStorage();
  }

  printPdf() {
    const PDF = new jsPDF({
      orientation: 'p',
    });
    var finalY = (PDF as any).lastAutoTable.finalY || 10;
    this.carsInGarage.forEach(car => {
      finalY = (PDF as any).lastAutoTable.finalY || 10;
      autoTable(PDF, {
        startY: finalY + 10,
        head: [
          [
            'Type',
            'Weight',
            'Hull',
            'Handling',
            'Gear',
            'Crew',
            'Slots',
            'Special Rules',
            'Cost',
          ],
        ],
        theme: 'grid',
        body: this.formatCarToPdf(car),
        headStyles: {
          halign: 'center',
        },
        columnStyles: {
          2: {
            halign: 'center',
          },
          3: {
            halign: 'center',
          },
          4: {
            halign: 'center',
          },
          5: {
            halign: 'center',
          },
          6: {
            halign: 'center',
          },
          8: {
            halign: 'center',
          },
        },
      });
      finalY = (PDF as any).lastAutoTable.finalY || 10;
      autoTable(PDF, {
        startY: finalY,
        head: [
          [
            'Weapon Name',
            'Range',
            'Attack Dice',
            'Special Rules',
            'Slots',
            'Cost',
          ],
        ],
        body: this.formatWeaponsToPdf(car.weapons),
        theme: 'grid',
        headStyles: {
          fillColor: [170, 170, 170],
          textColor: [255, 255, 255],
          halign: 'center',
        },
        columnStyles: {
          2: {
            halign: 'center',
          },
          4: {
            halign: 'center',
          },
          5: {
            halign: 'center',
          },
        },
      });
    });

    finalY = (PDF as any).lastAutoTable.finalY || 10;

    PDF.save('PDF-TEST.pdf');
  }

  formatCarToPdf(car: Vehicle) {
    return [
      [
        car.model.toString(),
        car.weight.toString(),
        car.hullPoints.toString(),
        car.handling.toString(),
        car.maxGearModified.toString(),
        car.crewModified.toString(),
        car.buildSlots.toString(),
        car.specialRules.map(rule => rule.name + ' ').toString(),
        car.cost.toString(),
      ],
    ];
  }

  formatWeaponsToPdf(weapons) {
    return weapons.map(weapon => {
      return [
        weapon.name.toString(),
        weapon.range.toString(),
        weapon.attack.toString(),
        weapon.rules.toString(),
        weapon.slots.toString(),
        weapon.cost.toString(),
      ];
    });
  }
}
