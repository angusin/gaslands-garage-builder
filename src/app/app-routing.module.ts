import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CarSelectorPageComponent } from './pages/car-selector-page/car-selector-page.component';

const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'car-selector', component: CarSelectorPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
