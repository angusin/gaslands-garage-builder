import { Component, OnInit } from '@angular/core';
import { computed } from 'mobx';
import { StoreService } from './../../services/store.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    constructor(private store: StoreService) {}

    ngOnInit(): void {}

    @computed get carsInGarage() {
        return this.store.carsInGarage;
    }
}
