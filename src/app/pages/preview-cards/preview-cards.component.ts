import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { computed } from 'mobx';
import { StoreService } from '../../services/store.service';
import { PrintService } from '../../services/print.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview-cards',
  templateUrl: './preview-cards.component.html',
  styleUrls: ['./preview-cards.component.scss'],
})
export class PreviewCardsComponent implements OnInit {
  @ViewChild('cardsToPrint', { read: ElementRef })
  cardsToPrint: ElementRef;

  @computed get carsInGarage() {
    return this.store.carsInGarage;
  }

  constructor(
    private store: StoreService,
    private printService: PrintService
  ) {}

  ngOnInit(): void {}

  printCards() {
    var data = document.getElementById('cardsToPrint');

    html2canvas(data).then(canvas => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(FILEURI, 'PNG', 10, 10, fileWidth, fileHeight);

      PDF.save('angular-demo.pdf');
    });
  }
}
