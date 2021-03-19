import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ServiceService } from './../../services/service.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Vehicle } from './../../types/types';
import { StoreService } from './../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  vehicles: Vehicle[];
  public configuration: Config;
  public columns: Columns[];
  @ViewChild('addVehicle', { static: true }) addVehicle: TemplateRef<any>;

  constructor(
    private service: ServiceService,
    private store: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getVehicles().then(vehicles => (this.vehicles = vehicles));
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.rows = 16;
    this.configuration.paginationEnabled = false;
    this.configuration.fixedColumnWidth = false;
    this.configuration.horizontalScroll = true;
    this.columns = [
      { key: 'action', title: '', cellTemplate: this.addVehicle },
      { key: 'model', title: 'Model' },
      { key: 'weight', title: 'Weight' },
      { key: 'hullPoints', title: 'Hull Points' },
      { key: 'handling', title: 'Handling' },
      { key: 'maxGear', title: 'Max Gear' },
      { key: 'buildSlots', title: 'Slots' },
      { key: 'crew', title: 'Crew' },
      { key: 'cost', title: 'Cost' },
    ];
  }

  addVehicleToGarage(row: number) {
    this.store.addCarToGarage(this.vehicles[row]);
    this.router.navigate(['/']);
  }
}
