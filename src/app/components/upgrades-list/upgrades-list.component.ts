import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Upgrade } from 'src/app/types/types';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-upgrades-list',
  templateUrl: './upgrades-list.component.html',
  styleUrls: ['./upgrades-list.component.scss'],
})
export class UpgradesListComponent implements OnInit {
  @Output() addUpgrade = new EventEmitter<Upgrade>();
  upgrades: Upgrade[];

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getUpgrades().then(upgrades => (this.upgrades = upgrades));
  }

  addUpgradeToCar(upgrade: Upgrade) {
    this.addUpgrade.emit(upgrade);
  }
}
