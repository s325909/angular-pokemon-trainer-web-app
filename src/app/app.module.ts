import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LandingPage } from './pages/landing/landing.page';
import { LandingFormComponent } from './components/landing-form/landing-form.component';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatchPokemonButtonComponent } from './components/catch-pokemon-button/catch-pokemon-button.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [ // Components
    AppComponent,
    CataloguePage,
    TrainerPage,
    LandingPage,
    LandingFormComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    NavbarComponent,
    CatchPokemonButtonComponent,
  ],
  imports: [  // Modules
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
