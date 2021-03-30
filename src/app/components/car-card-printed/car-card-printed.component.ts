import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../types/types';

@Component({
  selector: 'app-car-card-printed',
  templateUrl: './car-card-printed.component.html',
  styleUrls: ['./car-card-printed.component.scss'],
})
export class CarCardPrintedComponent implements OnInit {
  @Input() vehicle: Vehicle;

  constructor() {}

  ngOnInit(): void {}

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
