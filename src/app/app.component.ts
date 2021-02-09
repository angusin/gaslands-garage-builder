import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ServiceService } from './services/service.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { vehicle } from './types/types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    vehicles: vehicle[];
    public configuration: Config;
    public columns: Columns[];
    @ViewChild('addVehicle', { static: true }) addVehicle: TemplateRef<any>;

    constructor(private service: ServiceService) {}

    ngOnInit() {
        this.service.getVehicles().then(vehicles => (this.vehicles = vehicles));
        this.configuration = { ...DefaultConfig };
        this.configuration.searchEnabled = true;
        this.configuration.rows = 20;
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

    addVehicleToGarage(row) {
        console.log(row);
    }
}
