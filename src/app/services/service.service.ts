import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../types/types';

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
}
