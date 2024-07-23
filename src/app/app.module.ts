import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TableModule } from 'ngx-easy-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarSelectorPageComponent } from './pages/car-selector-page/car-selector-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WeaponsListComponent } from './components/weapons-list/weapons-list.component';
import { UpgradesListComponent } from './components/upgrades-list/upgrades-list.component';
import { ModalComponent } from './common/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarCardPrintedComponent } from './components/car-card-printed/car-card-printed.component';

import { ToastrModule } from 'ngx-toastr';
import { PreviewCardsComponent } from './pages/preview-cards/preview-cards.component';


@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CarCardComponent,
        CarListComponent,
        CarSelectorPageComponent,
        MainPageComponent,
        WeaponsListComponent,
        UpgradesListComponent,
        ModalComponent,
        PreviewCardsComponent,
        CarCardPrintedComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        TableModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-bottom-center',
        }),
        ], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
