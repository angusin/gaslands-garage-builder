import { Component } from '@angular/core';
import { computed } from 'mobx';
import { StoreService } from './../../services/store.service';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  @computed get carsInGarage() {
    return this.store.carsInGarage;
  }

  @computed get totalCost() {
    return this.store.totalCost();
  }

  constructor(
    private store: StoreService,
    private printService: PrintService
  ) {}

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
    this.printService.printPdf();
  }
}
