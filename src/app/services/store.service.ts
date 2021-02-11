import { Injectable } from '@angular/core';
import { action, observable } from 'mobx';
import { vehicle } from './../types/types';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    @observable carsInGarage: vehicle[] = [];

    constructor() {}

    @action addCarToGarage(car: vehicle) {
        this.carsInGarage.push(car);
    }
}
