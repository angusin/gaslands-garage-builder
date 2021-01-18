import { Component, OnInit } from '@angular/core';
import { ServiceService } from "./services/service.service";
import { vehicle } from "./types/types";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  vehicles: vehicle[];

  constructor(private service: ServiceService) { }


  ngOnInit() {
    this.service.getVehicles().then(vehicles => {this.vehicles = vehicles});
  }
}
