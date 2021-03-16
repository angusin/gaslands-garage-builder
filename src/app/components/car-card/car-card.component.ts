import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../types/types';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit {
  @Input() vehicle: Vehicle;

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  deleteCar() {
    this.store.deleteCarFromGarage(this.vehicle);
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
}
