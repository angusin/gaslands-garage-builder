import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle, Weapon, Upgrade } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ServiceService implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  getVehicles(): Promise<Vehicle[]> {
    return this.httpClient
      .get('assets/vehicles.json')
      .toPromise()
      .then(res => <Vehicle[]>res);
  }

  getWeapons(): Promise<Weapon[]> {
    return this.httpClient
      .get('assets/weapons.json')
      .toPromise()
      .then(res => <Weapon[]>res);
  }

  getUpgrades(): Promise<Upgrade[]> {
    return this.httpClient
      .get('assets/upgrades.json')
      .toPromise()
      .then(res => <Upgrade[]>res);
  }
}
