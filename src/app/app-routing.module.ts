import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CarSelectorPageComponent } from './pages/car-selector-page/car-selector-page.component';
import { PreviewCardsComponent } from './pages/preview-cards/preview-cards.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'car-selector', component: CarSelectorPageComponent },
  { path: 'preview-cards', component: PreviewCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
