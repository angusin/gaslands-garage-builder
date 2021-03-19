import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Weapon } from 'src/app/types/types';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-weapons-list',
  templateUrl: './weapons-list.component.html',
  styleUrls: ['./weapons-list.component.scss'],
})
export class WeaponsListComponent implements OnInit {
  @Output() addWeapon = new EventEmitter<Weapon>();
  weapons: Weapon[];

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getWeapons().then(weapons => (this.weapons = weapons));
  }

  addWeaponToCar(weapon: Weapon) {
    this.addWeapon.emit(weapon);
  }
}
