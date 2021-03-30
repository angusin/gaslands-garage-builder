import { Injectable } from '@angular/core';
import { computed } from 'mobx';
import { StoreService } from './store.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Vehicle } from '../types/types';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  @computed get carsInGarage() {
    return this.store.carsInGarage;
  }

  constructor(private store: StoreService) {}

  printPdf() {
    const PDF = new jsPDF({
      orientation: 'p',
    });
    PDF.text('Gaslands Garage Builder', 15, 15);
    PDF.text('Total cans: ' + this.store.totalCost(), 195, 15, {
      align: 'right',
    });
    var finalY = (PDF as any).lastAutoTable.finalY || 15;
    this.carsInGarage.forEach(car => {
      finalY = (PDF as any).lastAutoTable.finalY || 15;
      autoTable(PDF, {
        startY: finalY + 10,
        head: [
          [
            'Type',
            'Weight',
            'Hull',
            'Hand',
            'Gear',
            'Crew',
            'Special Rules',
            'Slots',
            'Cost',
          ],
        ],
        theme: 'grid',
        body: this.formatCarToPdf(car),
        headStyles: {
          halign: 'center',
        },
        columnStyles: {
          0: {
            cellWidth: 32,
          },
          1: {
            cellWidth: 24,
          },
          2: {
            halign: 'center',
            cellWidth: 12,
          },
          3: {
            halign: 'center',
            cellWidth: 12,
          },
          4: {
            halign: 'center',
            cellWidth: 12,
          },
          5: {
            halign: 'center',
            cellWidth: 12,
          },
          7: {
            halign: 'center',
            cellWidth: 12,
          },
          8: {
            halign: 'center',
            cellWidth: 12,
          },
        },
      });
      if (car.weapons.length > 0) {
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
            0: {
              cellWidth: 50,
            },
            2: {
              halign: 'center',
            },
            4: {
              halign: 'center',
              cellWidth: 12,
            },
            5: {
              halign: 'center',
              cellWidth: 12,
            },
          },
        });
      }
      if (car.upgrades.length > 0) {
        finalY = (PDF as any).lastAutoTable.finalY || 10;
        autoTable(PDF, {
          startY: finalY,
          head: [['Upgrade Name', 'Special Rules', 'Slots', 'Cost']],
          body: this.formatUpgradesToPdf(car.upgrades),
          theme: 'grid',
          headStyles: {
            fillColor: [170, 170, 170],
            textColor: [255, 255, 255],
            halign: 'center',
          },
          columnStyles: {
            0: {
              cellWidth: 50,
            },
            2: {
              halign: 'center',
              cellWidth: 12,
            },
            3: {
              halign: 'center',
              cellWidth: 12,
            },
          },
        });
      }
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
        car.specialRules.map(rule => ' ' + rule.name).toString(),
        car.buildSlots.toString(),
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

  formatUpgradesToPdf(upgrades) {
    return upgrades.map(upgrade => {
      return [
        upgrade.name.toString(),
        upgrade.rules.toString(),
        upgrade.slots.toString(),
        upgrade.cost.toString(),
      ];
    });
  }

  printCards(cardsToPrint) {
    console.log('🚀 - printCards - cardsToPrint', cardsToPrint);
    var data = document.getElementById('cardsToPrint');

    html2canvas(cardsToPrint).then(canvas => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('angular-demo.pdf');
    });
  }
}
