import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'ngx-easy-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarSelectorPageComponent } from './pages/car-selector-page/car-selector-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CarCardComponent,
        FormBuilderComponent,
        CarListComponent,
        CarSelectorPageComponent,
        MainPageComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, TableModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
