import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { vehicle } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ServiceService implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  getVehicles(): Promise<vehicle[]> {
    return this.httpClient
      .get('assets/vehicles.json')
      .toPromise()
      .then(res => <vehicle[]>res);
  }
}
